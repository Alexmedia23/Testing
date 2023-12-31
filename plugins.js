require('./Config')
const pino = require('pino')
const { Boom } = require('@hapi/boom')
const fs = require('fs')
const moment = require('moment-timezone');
const chalk = require('chalk')
const FileType = require('file-type')
const path = require('path')
const axios = require('axios')
const PhoneNumber = require('awesome-phonenumber')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./Gallery/lib/exif')
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetch, await, sleep, reSize } = require('./Gallery/lib/myfunc')
const { default: JoshbotConnect, delay, PHONENUMBER_MCC, makeCacheableSignalKeyStore, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto } = require("@whiskeysockets/baileys")
const NodeCache = require("node-cache")
const Pino = require("pino")
const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);
const readline = require("readline")
const { parsePhoneNumber } = require("libphonenumber-js")
const makeWASocket = require("@whiskeysockets/baileys").default

const store = makeInMemoryStore({
    logger: pino().child({
        level: 'silent',
        stream: 'store'
    })
})

let phoneNumber = "2348050907760"
let owner = JSON.parse(fs.readFileSync('./Gallery/database/owner.json'))

const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code")
const useMobile = process.argv.includes("--mobile")

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))
         
async function startJoshbot() {
//------------------------------------------------------
let { version, isLatest } = await fetchLatestBaileysVersion()
const {  state, saveCreds } =await useMultiFileAuthState(`./session`)
    const msgRetryCounterCache = new NodeCache() // for retry message, "waiting message"
    const Joshbot = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: !pairingCode, // popping up QR in terminal log
      mobile: useMobile, // mobile api (prone to bans)
      browser: ['Chrome (Linux)', '', ''], // for this issues https://github.com/WhiskeySockets/Baileys/issues/328
     auth: {
         creds: state.creds,
         keys: makeCacheableSignalKeyStore(state.keys, Pino({ level: "fatal" }).child({ level: "fatal" })),
      },
      browser: ['Chrome (Linux)', '', ''], // for this issues https://github.com/WhiskeySockets/Baileys/issues/328
      markOnlineOnConnect: true, // set false for offline
      generateHighQualityLinkPreview: true, // make high preview link
      getMessage: async (key) => {
         let jid = jidNormalizedUser(key.remoteJid)
         let msg = await store.loadMessage(jid, key.id)

         return msg?.message || ""
      },
      msgRetryCounterCache, // Resolve waiting messages
      defaultQueryTimeoutMs: undefined, // for this issues https://github.com/WhiskeySockets/Baileys/issues/276
   })
   
   store.bind(Joshbot.ev)

    // login use pairing code
   // source code https://github.com/WhiskeySockets/Baileys/blob/master/Example/example.ts#L61
   if (pairingCode && !Joshbot.authState.creds.registered) {
      if (useMobile) throw new Error('Cannot use pairing code with mobile api')

      let phoneNumber
      if (!!phoneNumber) {
         phoneNumber = phoneNumber.replace(/[^0-9]/g, '')

         if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
            console.log(chalk.bgBlack(chalk.redBright("Start with country code of your WhatsApp Number, Example : +2341993112239")))
            process.exit(0)
         }
      } else {
         phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`Your WhatsApp bot number\nFor example: +2341993112239 : `)))
         phoneNumber = phoneNumber.replace(/[^0-9]/g, '')

         // Ask again when entering the wrong number
         if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
            console.log(chalk.bgBlack(chalk.redBright("Start with country code of your WhatsApp Number, Example : +2341993112239")))

            phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`Your WhatsApp bot number please\nFor example: +2341993112239: `)))
            phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
            rl.close()
         }
      }

      setTimeout(async () => {
         let code = await Joshbot.requestPairingCode(phoneNumber)
         code = code?.match(/.{1,4}/g)?.join("-") || code
         console.log(chalk.black(chalk.bgGreen(`Your Pairing Code: `)), chalk.black(chalk.white(code)))
      }, 3000)
   }

    Joshbot.ev.on('messages.upsert', async chatUpdate => {
        //console.log(JSON.stringify(chatUpdate, undefined, 2))
        try {
            const mek = chatUpdate.messages[0]
            if (!mek.message) return
            mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
            if (mek.key && mek.key.remoteJid === 'status@broadcast'){
            if (autoread_status) {
            await Joshbot.readMessages([mek.key]) 
            }
            } 
            if (!Joshbot.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
            if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
            const m = smsg(Joshbot, mek, store)
            require("./Heart")(Joshbot, m, chatUpdate, store)
        } catch (err) {
            console.log(err)
        }
    })

   
    Joshbot.decodeJid = (jid) => {
        if (!jid) return jid
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {}
            return decode.user && decode.server && decode.user + '@' + decode.server || jid
        } else return jid
    }

    Joshbot.ev.on('contacts.update', update => {
        for (let contact of update) {
            let id = Joshbot.decodeJid(contact.id)
            if (store && store.contacts) store.contacts[id] = {
                id,
                name: contact.notify
            }
        }
    })

    Joshbot.getName = (jid, withoutContact = false) => {
        id = Joshbot.decodeJid(jid)
        withoutContact = Joshbot.withoutContact || withoutContact
        let v
        if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
            v = store.contacts[id] || {}
            if (!(v.name || v.subject)) v = Joshbot.groupMetadata(id) || {}
            resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
        })
        else v = id === '0@s.whatsapp.net' ? {
                id,
                name: 'WhatsApp'
            } : id === Joshbot.decodeJid(Joshbot.user.id) ?
            Joshbot.user :
            (store.contacts[id] || {})
        return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
    }
    
    Joshbot.public = true

    Joshbot.serializeM = (m) => smsg(Joshbot, m, store)

Joshbot.ev.on("connection.update",async  (s) => {
        const { connection, lastDisconnect } = s
        if (connection == "open") {
console.log(chalk.green('Welcome to Joshbot-md'));
console.log(chalk.gray('\n\nInitializing...'));
console.log(chalk.cyan('\n\nConnected'));

const ownernumber = global.ownernumber;
await Joshbot.sendMessage(ownernumber + '@s.whatsapp.net', { text: `Your bot has been Connected ${readmore} to the server\n\n_*Sudo:${global.ownernumber}*_\n_*Prefix:( ${global.prefa} )*_\n\n _*Other Configurations*_\n\n*Always-online->* _${global.online}_\n*Auto-typing->* _${global.autoTyping}_\n*Autorecording->* _${global.autoRecording}_\n*Autoread->* _${global.autoread}_` });

const rainbowColors = ['red', 'yellow', 'green', 'blue', 'purple'];
let index = 0;

function printRainbowMessage() {
  const color = rainbowColors[index];
  console.log(chalk.keyword(color)('\n\nwaiting for messages'));
  index = (index + 1) % rainbowColors.length;
  setTimeout(printRainbowMessage, 60000);  // Adjust the timeout for desired speed
}

printRainbowMessage();
}
    
        
                if (
            connection === "close" &&
            lastDisconnect &&
            lastDisconnect.error &&
            lastDisconnect.error.output.statusCode != 401
        ) {
            startJoshbot()
        }
    })
    Joshbot.ev.on('creds.update', saveCreds)
    Joshbot.ev.on("messages.upsert",  () => { })

    Joshbot.sendText = (jid, text, quoted = '', options) => Joshbot.sendMessage(jid, {
        text: text,
        ...options
    }, {
        quoted,
        ...options
    })
    Joshbot.sendTextWithMentions = async (jid, text, quoted, options = {}) => Joshbot.sendMessage(jid, {
        text: text,
        mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'),
        ...options
    }, {
        quoted
    })
    Joshbot.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options)
        } else {
            buffer = await imageToWebp(buff)
        }

        await Joshbot.sendMessage(jid, {
            sticker: {
                url: buffer
            },
            ...options
        }, {
            quoted
        })
        return buffer
    }
    Joshbot.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifVid(buff, options)
        } else {
            buffer = await videoToWebp(buff)
        }

        await Joshbot.sendMessage(jid, {
            sticker: {
                url: buffer
            },
            ...options
        }, {
            quoted
        })
        return buffer
    }
    Joshbot.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
        let quoted = message.msg ? message.msg : message
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(quoted, messageType)
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        let type = await FileType.fromBuffer(buffer)
        trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
        // save to file
        await fs.writeFileSync(trueFileName, buffer)
        return trueFileName
    }
Joshbot.ev.on('group-participants.update', async (anu) => {
console.log(anu)
try {
let metadata = await Joshbot.groupMetadata(anu.id)
let participants = anu.participants
for (let num of participants) {
try {
ppuser = await Joshbot.profilePictureUrl(num, 'image')
} catch (err) {
ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}
try {
ppgroup = await Joshbot.profilePictureUrl(anu.id, 'image')
} catch (err) {
ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60'
}
//welcome\\
memb = metadata.participants.length
JoshbotWlcm = await getBuffer(ppuser)
JoshbotLft = await getBuffer(ppuser)
                if (anu.action == 'add') {
                const Joshbotbuffer = await getBuffer(ppuser)
                let JoshbotName = num
                const xtime = moment.tz('Asia/Kolkata').format('HH:mm:ss')
	            const xdate = moment.tz('Asia/Kolkata').format('DD/MM/YYYY')
	            const xmembers = metadata.participants.length
                Joshbotbody = `┌──⊰ 🎗𝑾𝑬𝑳𝑳𝑪𝑶𝑴𝑬🎗⊰
│⊳  🌐 To: ${metadata.subject}
│⊳  📋 Name: @${JoshbotName.split("@")[0]}
│⊳  👥 Members: ${xmembers}th
│⊳  🕰️ Joined: ${xtime} ${xdate}
└──────────⊰
`
Joshbot.sendMessage(anu.id,
 { text: Joshbotbody,
 contextInfo:{
 mentionedJid:[num],
 "externalAdReply": {"showAdAttribution": true,
 "containsAutoReply": true,
 "title": ` ${global.botname}`,
"body": `${ownername}`,
 "previewType": "PHOTO",
"thumbnailUrl": ``,
"thumbnail": JoshbotWlcm,
"sourceUrl": `${link}`}}})
                } else if (anu.action == 'remove') {
                	const Joshbotbuffer = await getBuffer(ppuser)
                    const Joshbottime = moment.tz('Asia/Kolkata').format('HH:mm:ss')
	                const Joshbotdate = moment.tz('Asia/Kolkata').format('DD/MM/YYYY')
                	let JoshbotName = num
                    const Joshbotmembers = metadata.participants.length
  Joshbotbody = `┌──⊰🍁𝑭𝑨𝑹𝑬𝑾𝑬𝑳𝑳🍁⊰
│⊳  👤 From: ${metadata.subject}
│⊳  📃 Reason: Left
│⊳  📔 Name: @${JoshbotName.split("@")[0]}
│⊳  👥 Members: ${Joshbotmembers}th
│⊳  🕒 Time: ${Joshbottime} ${Joshbotdate}
└──────────⊰


`
Joshbot.sendMessage(anu.id,
 { text: Joshbotbody,
 contextInfo:{
 mentionedJid:[num],
 "externalAdReply": {"showAdAttribution": true,
 "containsAutoReply": true,
 "title": ` ${global.botname}`,
"body": `${ownername}`,
 "previewType": "PHOTO",
"thumbnailUrl": ``,
"thumbnail": JoshbotLft,
"sourceUrl": `${link}`}}})
} else if (anu.action == 'promote') {
const Joshbotbuffer = await getBuffer(ppuser)
const Joshbottime = moment.tz('Asia/Kolkata').format('HH:mm:ss')
const Joshbotdate = moment.tz('Asia/Kolkata').format('DD/MM/YYYY')
let JoshbotName = num
Joshbotbody = ` 𝗖𝗼𝗻𝗴𝗿𝗮𝘁𝘀🎉 @${JoshbotName.split("@")[0]}, you have been *promoted* to *admin* 🥳`
   Joshbot.sendMessage(anu.id,
 { text: Joshbotbody,
 contextInfo:{
 mentionedJid:[num],
 "externalAdReply": {"showAdAttribution": true,
 "containsAutoReply": true,
 "title": ` ${global.botname}`,
"body": `${ownername}`,
 "previewType": "PHOTO",
"thumbnailUrl": ``,
"thumbnail": JoshbotWlcm,
"sourceUrl": `${link}`}}})
} else if (anu.action == 'demote') {
const Joshbotbuffer = await getBuffer(ppuser)
const Joshbottime = moment.tz('Asia/Kolkata').format('HH:mm:ss')
const Joshbotdate = moment.tz('Asia/Kolkata').format('DD/MM/YYYY')
let JoshbotName = num
Joshbotbody = `𝗢𝗼𝗽𝘀‼️ @${JoshbotName.split("@")[0]}, you have been *demoted* from *admin* 😬`
Joshbot.sendMessage(anu.id,
 { text: Joshbotbody,
 contextInfo:{
 mentionedJid:[num],
 "externalAdReply": {"showAdAttribution": true,
 "containsAutoReply": true,
 "title": ` ${global.botname}`,
"body": `${ownername}`,
 "previewType": "PHOTO",
"thumbnailUrl": ``,
"thumbnail": JoshbotLft,
"sourceUrl": `${link}`}}})
}
}
} catch (err) {
console.log(err)
}
})

    Joshbot.downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(message, messageType)
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }

        return buffer
    }
    }
return startJoshbot()

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})

process.on('uncaughtException', function (err) {
let e = String(err)
if (e.includes("Socket connection timeout")) return
if (e.includes("item-not-found")) return
if (e.includes("rate-overlimit")) return
if (e.includes("Connection Closed")) return
if (e.includes("Timed Out")) return
if (e.includes("Value not found")) return
console.log('Caught exception: ', err)
})