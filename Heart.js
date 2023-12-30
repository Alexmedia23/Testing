const {
  BufferJSON,
  WA_DEFAULT_EPHEMERAL,
  generateWAMessageFromContent,
  proto,
  generateWAMessageContent,
  generateWAMessage,
  prepareWAMessageMedia,
  areJidsSameUser,
  getContentType,
} = require("@whiskeysockets/baileys");
const os = require("os");
const fs = require("fs");
const fsx = require("fs-extra");
const path = require("path");
const googleTTS = require("google-tts-api");
const util = require("util");
const chalk = require("chalk");
const moment = require("moment-timezone");
const speed = require("performance-now");
const ms = (toMs = require("ms"));
const axios = require("axios");
const fetch = require("node-fetch");
const { exec, spawn, execSync } = require("child_process");
const { performance } = require("perf_hooks");
const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);
const {
  TelegraPh,
  UploadFileUgu,
  webp2mp4File,
  floNime,
} = require("./Gallery/lib/uploader");
const {
  toAudio,
  toPTT,
  toVideo,
  ffmpeg,
  addExifAvatar,
} = require("./Gallery/lib/converter");
const {
  smsg,
  getGroupAdmins,
  formatp,
  jam,
  formatDate,
  getTime,
  isUrl,
  await,
  sleep,
  clockString,
  msToDate,
  sort,
  toNumber,
  enumGetKey,
  runtime,
  fetchJson,
  getBuffer,
  json,
  delay,
  format,
  logic,
  generateProfilePicture,
  parseMention,
  getRandom,
  pickRandom,
  reSize,
} = require("./Gallery/lib/myfunc");
let afk = require("./Gallery/lib/afk");

const { fetchBuffer, buffergif } = require("./Gallery/lib/myfunc2");
const { uptime } = require("process");

/////log
global.ownernumber = "2348050907760";
//Gallery/database
let ntilinkall = JSON.parse(
  fs.readFileSync("./Gallery/database/antilink.json")
);
let _owner = JSON.parse(fs.readFileSync("./Gallery/database/owner.json"));
let owner = JSON.parse(fs.readFileSync("./Gallery/database/owner.json"));
let _afk = JSON.parse(fs.readFileSync("./Gallery/database/afk-user.json"));
let hit = JSON.parse(fs.readFileSync("./Gallery/database/total-hit-user.json"));

//time
const replay = (teks) => {
  Joshbot.sendMessage(m.chat, { text: teks }, { quoted: m });
};
const xtime = moment.tz("Asia/Kolkata").format("HH:mm:ss");
const xdate = moment.tz("Asia/Kolkata").format("DD/MM/YYYY");
const time2 = moment().tz("Asia/Kolkata").format("HH:mm:ss");
if (time2 < "23:59:00") {
  var Joshuaytimewisher = `Good Night 🌌`;
}
if (time2 < "19:00:00") {
  var Joshuaytimewisher = `Good Evening 🌃`;
}
if (time2 < "18:00:00") {
  var Joshuaytimewisher = `Good Evening 🌃`;
}
if (time2 < "15:00:00") {
  var Joshuaytimewisher = `Good Afternoon 🌅`;
}
if (time2 < "11:00:00") {
  var Joshuaytimewisher = `Good Morning 🌄`;
}
if (time2 < "05:00:00") {
  var Joshuaytimewisher = `Good Morning 🌄`;
}
module.exports = Joshbot = async (Joshbot, m, msg, chatUpdate, store) => {
  try {
    const { type, quotedMsg, mentioned, now, fromMe } = m;
    var body =
      m.mtype === "conversation"
        ? m.message.conversation
        : m.mtype == "imageMessage"
        ? m.message.imageMessage.caption
        : m.mtype == "videoMessage"
        ? m.message.videoMessage.caption
        : m.mtype == "extendedTextMessage"
        ? m.message.extendedTextMessage.text
        : m.mtype == "buttonsResponseMessage"
        ? m.message.buttonsResponseMessage.selectedButtonId
        : m.mtype == "listResponseMessage"
        ? m.message.listResponseMessage.singleSelectreply.selectedRowId
        : m.mtype == "templateButtonreplyMessage"
        ? m.message.templateButtonreplyMessage.selectedId
        : m.mtype === "messageContextInfo"
        ? m.message.buttonsResponseMessage?.selectedButtonId ||
          m.message.listResponseMessage?.singleSelectreply.selectedRowId ||
          m.text
        : "";
    var budy = typeof m.text == "string" ? m.text : "";
    const prefix = global.prefa;
    const isCmd = body.startsWith(prefix);
    const command = isCmd ? body.slice(1).trim().split(' ')[0].toLowerCase() : '' 
    const args = body.trim().split(/ +/).slice(1);
    const full_args = body.replace(command, "").slice(1).trim();
    const pushname = m.pushName || "No Name";
    const botNumber = await Joshbot.decodeJid(Joshbot.user.id);
    const itsMe = m.sender == botNumber ? true : false;
    const sender = m.sender;
    const text = (q = args.join(" "));
    const from = m.key.remoteJid;
    const fatkuns = m.quoted || m;
    const quoted =
      fatkuns.mtype == "buttonsMessage"
        ? fatkuns[Object.keys(fatkuns)[1]]
        : fatkuns.mtype == "templateMessage"
        ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]]
        : fatkuns.mtype == "product"
        ? fatkuns[Object.keys(fatkuns)[0]]
        : m.quoted
        ? m.quoted
        : m;
    const mime = (quoted.msg || quoted).mimetype || "";
    const qmsg = quoted.msg || quoted;
    const isMedia = /image|video|sticker|audio/.test(mime);
    const isImage = type == "imageMessage";
    const isVideo = type == "videoMessage";

    const isAudio = type == "audioMessage";
    const isText = type == "textMessage";
    const isSticker = type == "stickerMessage";
    const isQuotedText =
      type === "extendexTextMessage" && content.includes("textMessage");
    const isQuotedImage =
      type === "extendedTextMessage" && content.includes("imageMessage");
    const isQuotedLocation =
      type === "extendedTextMessage" && content.includes("locationMessage");
    const isQuotedVideo =
      type === "extendedTextMessage" && content.includes("videoMessage");
    const isQuotedSticker =
      type === "extendedTextMessage" && content.includes("stickerMessage");
    const isQuotedAudio =
      type === "extendedTextMessage" && content.includes("audioMessage");
    const isQuotedContact =
      type === "extendedTextMessage" && content.includes("contactMessage");
    const isQuotedDocument =
      type === "extendedTextMessage" && content.includes("documentMessage");
    const sticker = [];
    const isAfkOn = afk.checkAfkUser(m.sender, _afk);
    const isGroup = m.key.remoteJid.endsWith("@g.us");
    const groupMetadata = m.isGroup
      ? await Joshbot.groupMetadata(m.chat).catch((e) => {})
      : "";
    const groupName = m.isGroup ? groupMetadata.subject : "";
    const participants = m.isGroup ? await groupMetadata.participants : "";
    const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : "";
    const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false;
    const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false;
    const groupOwner = m.isGroup ? groupMetadata.owner : "";
    const mentionByTag =
      type == "extendedTextMessage" &&
      m.message.extendedTextMessage.contextInfo != null
        ? m.message.extendedTextMessage.contextInfo.mentionedJid
        : [];
    const mentionByReply =
      type == "extendedTextMessage" &&
      m.message.extendedTextMessage.contextInfo != null
        ? m.message.extendedTextMessage.contextInfo.participant || ""
        : "";
    const isGroupOwner = m.isGroup
      ? (groupOwner ? groupOwner : groupAdmins).includes(m.sender)
      : false;
    const isCreator = [ownernumber, ..._owner]
      .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
      .includes(m.sender);
    const AntiLinkAll = m.isGroup ? ntilinkall.includes(from) : false;
    //group chat msg by Joshua
    const reply = (teks) => {
      Joshbot.sendMessage(
        m.chat,
        {
          text: teks,
          contextInfo: {
            mentionedJid: [sender],
          },
        },
        { quoted: m }
      );
    };

    async function loading() {
      var Joshualod = [
        "《 ▒▒▒▒▒▒▒▒▒▒▒》10%",
        "《 ████▒▒▒▒▒▒▒▒》30%",
        "《 ███████▒▒▒▒▒》50%",
        "《 ██████████▒▒》80%",
        "《 ████████████》100%",
        "Done ✅️",
      ];
      let { key } = await Joshbot.sendMessage(from, { text: "ʟᴏᴀᴅɪɴɢ..." });

      for (let i = 0; i < Joshualod.length; i++) {
        await Joshbot.sendMessage(from, { text: Joshualod[i], edit: key });
      }
    }

    if (!Joshbot.public) {
      if (!isCreator && !m.key.fromMe) return;
    }
    if (autoread) {
      Joshbot.readMessages([m.key]);
    }
    if (global.autoTyping) {
      Joshbot.sendPresenceUpdate("composing", from);
    }

    if (global.autoRecording) {
      Joshbot.sendPresenceUpdate("recording", from);
    }

    if (global.online) {
      if (m.chat) {
        Joshbot.sendPresenceUpdate("available", m.chat);
      }
    }

    if (global.autorecordtype) {
      let Joshuarecordin = ["recording", "composing"];

      let Joshuarecordinfinal =
        Joshuarecordin[Math.floor(Math.random() * Joshuarecordin.length)];

      Joshbot.sendPresenceUpdate(Joshuarecordinfinal, from);
    }

    if (autobio) {
      Joshbot.sendPresenceUpdate;
      Joshbot.updateProfileStatus(
        `Hey,Joshbot-Md is here to inspire and lead, thanks to Joshua Botz, Inc. ${runtime(
          process.uptime()
        )} `
      ).catch((_) => _);
    }
    if (m.sender.startsWith("212") && global.anti212 === true) {
      return Joshbot.updateBlockStatus(m.sender, "block");
    }

    let list = [];
    for (let i of owner) {
      list.push({
        displayName: await Joshbot.getName(i),
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await Joshbot.getName(
          i
        )}\nFN:${await Joshbot.getName(
          i
        )}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Click here to chat\nitem2.EMAIL;type=INTERNET:${ytname}\nitem2.X-ABLabel:YouTube\nitem3.URL:${socialm}\nitem3.X-ABLabel:GitHub\nitem4.ADR:;;${location};;;;\nitem4.X-ABLabel:Region\nEND:VCARD`,
      });
    }

    //chat counter (console log)
    if (m.message && m.isGroup) {
      console.log(chalk.redBright(`\n\nGroup Chat:`));
      console.log(
        chalk.black(chalk.bgWhite("[ MESSAGE ]")),
        chalk.black(chalk.bgGreen(new Date())),
        chalk.black(chalk.bgBlue(budy || m.mtype)) +
          "\n" +
          chalk.magenta("=> From"),
        chalk.green(pushname),
        chalk.yellow(m.sender) + "\n" + chalk.blueBright("=> In"),
        chalk.green(groupName, m.chat)
      );
    } else {
      console.log(chalk.redBright(`\n\nPrivate Chat:`));
      console.log(
        chalk.black(chalk.bgWhite("[ MESSAGE ]")),
        chalk.black(chalk.bgGreen(new Date())),
        chalk.black(chalk.bgBlue(budy || m.mtype)) +
          "\n" +
          chalk.magenta("=> From"),
        chalk.green(pushname),
        chalk.yellow(m.sender)
      );
    }

    if (command) {
      const cmdadd = () => {
        hit[0].hit_cmd += 1;
        fs.writeFileSync(
          "./Gallery/database/total-hit-user.json",
          JSON.stringify(hit)
        );
      };
      cmdadd();
      const totalhit = JSON.parse(
        fs.readFileSync("./Gallery/database/total-hit-user.json")
      )[0].hit_cmd;
    }

    if (m.isGroup && !m.key.fromMe) {
      let mentionUser = [
        ...new Set([
          ...(m.mentionedJid || []),
          ...(m.quoted ? [m.quoted.sender] : []),
        ]),
      ];
      for (let ment of mentionUser) {
        if (afk.checkAfkUser(ment, _afk)) {
          let getId2 = afk.getAfkId(ment, _afk);
          let getReason2 = afk.getAfkReason(getId2, _afk);
          let getTimee = Date.now() - afk.getAfkTime(getId2, _afk);
          let heheh2 = ms(getTimee);
          reply(`Don't tag him, he's afk\n\n*Reason :* ${getReason2}`);
        }
      }
      if (afk.checkAfkUser(m.sender, _afk)) {
        let getId = afk.getAfkId(m.sender, _afk);
        let getReason = afk.getAfkReason(getId, _afk);
        let getTime = Date.now() - afk.getAfkTime(getId, _afk);
        let heheh = ms(getTime);
        _afk.splice(afk.getAfkPosition(m.sender, _afk), 1);
        fs.writeFileSync(
          "./Gallery/database/afk-user.json",
          JSON.stringify(_afk)
        );
        Joshbot.sendTextWithMentions(
          m.chat,
          `@${m.sender.split("@")[0]} have returned from afk`,
          m
        );
      }
    }

    /*------ Not allowing  212 and 210 country codes to use bot in DM ---------- */

    const messSenderMain = m.sender;
    const messForm = m.chat;
    if (!m.isGroup) {
      if (messForm.startsWith("212") || messForm.startsWith("210")) {
        return;
      }
    }

    ///antilink
    if (AntiLinkAll)
      if (budy.includes("https://")) {
        if (!isBotAdmins) return;
        bvl = `\`\`\`「 Link Detected 」\`\`\`\n\nAdmin has sent a link, admin is free to send any link`;
        if (isAdmins) return m.reply(bvl);
        if (m.key.fromMe) return m.reply(bvl);
        if (isCreator) return m.reply(bvl);
        await Joshbot.sendMessage(m.chat, {
          delete: {
            remoteJid: m.chat,
            fromMe: false,
            id: m.key.id,
            participant: m.key.participant,
          },
        });
        Joshbot.groupParticipantsUpdate(m.chat, [m.sender], "remove");
        Joshbot.sendMessage(
          from,
          {
            text: `\`\`\`「 Link Detected 」\`\`\`\n\n@${
              m.sender.split("@")[0]
            } Has been kicked because of sending link in this group`,
            contextInfo: { mentionedJid: [m.sender] },
          },
          { quoted: m }
        );
      } else {
      }

    switch (command) {
      case "antilink":
        {
          if (!m.isGroup) return reply(mess.group);
          if (!isAdmins && !isCreator) return reply(mess.admin);
          if (!isBotAdmins) return reply(mess.botAdmin);
          if (args[0] === "on") {
            if (AntiLinkAll) return reply("Already activated");
            ntilinkall.push(from);
            fs.writeFileSync(
              "./Gallery/database/antilink.json",
              JSON.stringify(ntilinkall)
            );
            reply("Success in turning on all antilink in this group");
            var groupe = await Joshbot.groupMetadata(from);
            var members = groupe["participants"];
            var mems = [];
            members.map(async (adm) => {
              mems.push(adm.id.replace("c.us", "s.whatsapp.net"));
            });
            Joshbot.sendMessage(
              from,
              {
                text: `\`\`\`「 ⚠️Warning⚠️ 」\`\`\`\n\nIf you're not an admin, don't send any link in this group or u will be kicked immediately!`,
                contextInfo: { mentionedJid: mems },
              },
              { quoted: m }
            );
          } else if (args[0] === "off") {
            if (!AntiLinkAll) return reply("Already deactivated");
            let off = ntilinkall.indexOf(from);
            ntilinkall.splice(off, 1);
            fs.writeFileSync(
              "./Gallery/database/antilinkall.json",
              JSON.stringify(ntilinkall)
            );
            reply("Success in turning off all antilink in this group");
          } else {
            await reply(
              `Please Type The Option\n\nExample: ${
                prefix + command
              } on\nExample: ${
                prefix + command
              } off\n\non to enable\noff to disable`
            );
          }
        }
        break;

      case "changeprefix":
      case "setprefix": {
        if (!isCreator) return reply(mess.owner);
        Joshbot.sendMessage(from, { react: { text: "🛡️", key: m.key } });

        if (args.length !== 1) {
          return m.reply(
            `Please provide a single character as the new prefix.`
          );
        } else {
          const newPrefix = args[0];
          try {
            global.prefix = [newPrefix];
            return m.reply(
              `${pushname} Successfully changed Prefix to "${newPrefix}"`
            );
          } catch (error) {
            console.error("Error changing prefix:", error);
            return m.reply(
              `An error occurred while changing the prefix. Please try again later.`
            );
          }
        }
      }

      case "server":
      case "sysinfo":
        {
          const used = process.memoryUsage();
          const cpu = os.cpus()[0];
          const totalCpuUsage = (
            (100 *
              (cpu.times.user +
                cpu.times.nice +
                cpu.times.sys +
                cpu.times.irq)) /
            cpu.times.idle
          ).toFixed(2);
          const systemName = os.platform() + " " + os.release();

          const respon = `
    *Joshbot's Server Info* 
    
    *System*: ${systemName}
    
    *RAM*: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}
    
    *NodeJS Memory Usage*: ${Object.keys(used)
      .map((key) => `${key}: ${formatp(used[key])}`)
      .join(", ")}
    
    *Total CPU Usage*: ${totalCpuUsage}%
    
    *CPU Model*: ${cpu.model.trim()} (${cpu.speed} MHz)
    
    *Runtime*: ${runtime(process.uptime())}
    
    `.trim();

          m.reply(respon);
        }
        break;

      case "deletesession":
      case "delsession":
      case "clearsession":
        {
          if (!isCreator) return reply(mess.owner);
          fs.readdir("./Gallery/session", async function (err, files) {
            if (err) {
              console.log("Unable to scan directory: " + err);
              return reply("Unable to scan directory: " + err);
            }
            let filteredArray = await files.filter(
              (item) =>
                item.startsWith("pre-key") ||
                item.startsWith("sender-key") ||
                item.startsWith("session-") ||
                item.startsWith("app-state")
            );
            console.log(filteredArray.length);
            let teks = `Detected ${filteredArray.length} junk files\n\n`;
            if (filteredArray.length == 0) return reply(teks);
            filteredArray.map(function (e, i) {
              teks += i + 1 + `. ${e}\n`;
            });
            reply(teks);
            await sleep(2000);
            reply("Delete junk files...");
            await filteredArray.forEach(function (file) {
              fs.unlinkSync(`./Gallery/session/${file}`);
            });
            await sleep(2000);
            reply("Successfully deleted all the trash in the session folder");
          });
        }
        break;
      case "join":
        try {
          if (!isCreator) return reply(mess.owner);
          if (!text) return reply("Enter Group Link!");
          if (!isUrl(args[0]) && !args[0].includes("whatsapp.com"))
            return reply("Link Invalid!");
          reply(mess.wait);
          let result = args[0].split("https://chat.whatsapp.com/")[1];
          await Joshbot.groupAcceptInvite(result)
            .then((res) => reply(json(res)))
            .catch((err) => reply(json(err)));
        } catch {
          reply("Failed to join the Group");
        }
        break;
      case "session":
        if (!isCreator) return reply(mess.owner);
        reply("Wait a moment, currently retrieving your session file");
        let sesi = await fs.readFileSync("./session/creds.json");
        Joshbot.sendMessage(
          m.chat,
          {
            document: sesi,
            mimetype: "application/json",
            fileName: "creds.json",
          },
          {
            quoted: m,
          }
        );
        break;
      case "poll":
        {
          if (!isCreator) return reply(mess.owner);

          let [poll, opt] = text.split("|");

          if (text.split("|") < 2)
            return await reply(
              `Mention question and atleast 2 options\nExample: ${prefix}poll Who is best admin?|Xeon,Cheems,Doge...`
            );

          let options = [];

          for (let i of opt.split(",")) {
            options.push(i);
          }

          await Joshbot.sendMessage(m.chat, {
            poll: {
              name: poll,

              values: options,
            },
          });
        }

        break;
      case "shutdown":
        if (!isCreator) return reply(mess.owner);
        reply(`Goodbye........`);
        await sleep(5000);
        process.exit();
        break;
      case "restart":
        if (!isCreator) return reply(mess.owner);
        reply("In Process....");
        exec("pm2 restart all");
        break;
      case "autoread":
        if (!isCreator) return reply(mess.owner);
        if (args.length < 1) return reply(`Example ${prefix + command} on/off`);
        if (q === "on") {
          autoread = true;
          reply(`Successfully changed autoread to ${q}`);
        } else if (q === "off") {
          autoread = false;
          reply(`Successfully changed autoread to ${q}`);
        }
        break;
      case "autotyping":
        if (!isCreator) return reply(mess.owner);
        if (args.length < 1) return reply(`Example ${prefix + command} on/off`);
        if (q === "on") {
          autoTyping = true;
          reply(`Successfully changed auto-typing to ${q}`);
        } else if (q === "off") {
          autoTyping = false;
          reply(`Successfully changed auto-typing to ${q}`);
        }
        break;
      case "autorecording":
        if (!isCreator) return reply(mess.owner);
        if (args.length < 1) return reply(`Example ${prefix + command} on/off`);
        if (q === "on") {
          autoRecording = true;
          reply(`Successfully changed auto-recording to ${q}`);
        } else if (q === "off") {
          autoRecording = false;
          reply(`Successfully changed auto-recording to ${q}`);
        }
        break;
      case "autorecordtype":
        if (!isCreator) return reply(mess.owner);
        if (args.length < 1) return reply(`Example ${prefix + command} on/off`);
        if (q === "on") {
          autorecordtype = true;
          reply(`Successfully changed auto recording and typing to ${q}`);
        } else if (q === "off") {
          autorecordtype = false;
          reply(`Successfully changed auto recording and typing to ${q}`);
        }
        break;
      case "autoswview":
        if (!isCreator) return reply(mess.owner);
        if (args.length < 1) return reply(`Example ${prefix + command} on/off`);
        if (q === "on") {
          autoread_status = true;
          reply(`Successfully changed auto status/story view to ${q}`);
        } else if (q === "off") {
          autoread_status = false;
          reply(`Successfully changed auto status/story view to ${q}`);
        }
        break;
      case "autobio":
        if (!isCreator) return reply(mess.owner);
        if (args.length < 1) return reply(`Example ${prefix + command} on/off`);
        if (q == "on") {
          autobio = true;
          reply(`🟨Successfully Changed AutoBio To ${q}`);
        } else if (q == "off") {
          autobio = false;
          reply(`🟨Successfully Changed AutoBio To ${q}`);
        }
        break;

      case "online":
        if (!isCreator) return reply(mess.owner);
        if (args.length < 1) return reply(`Example ${prefix + command} on/off`);
        if (q == "on") {
          online = true;
          reply(`Always Online has been activated successfully`);
        }
        if (q == "off") {
          online = false;
          reply(`Always Online has been disactivated successfully`);
        }
        break;

      case "mode":
        if (!isCreator) return reply(mess.owner);
        if (args.length < 1)
          return reply(
            ` Check out this example: ${prefix + command} in public/self`
          );
        if (q == "public") {
          Joshbot.public = true;
          reply(mess.done);
        } else if (q == "self") {
          Joshbot.public = false;
          reply(mess.done);
        }
        break;
      case "setexif":
        if (!isCreator) return reply(mess.owner);
        if (!text)
          return reply(`Example : ${prefix + command} packname|author`);
        global.packname = text.split("|")[0];
        global.author = text.split("|")[1];
        reply(
          `Exif successfully changed to\n\n• Packname : ${global.packname}\n• Author : ${global.author}`
        );
        break;
      case "setpp":
      case "pp":
        if (!isCreator) return reply(mess.owner);
        if (!quoted)
          return reply(`Send/Reply Image With Caption ${prefix + command}`);
        if (!/image/.test(mime))
          return reply(`Send/Reply Image With Caption ${prefix + command}`);
        if (/webp/.test(mime))
          return reply(`Send/Reply Image With Caption ${prefix + command}`);
        var medis = await Joshbot.downloadAndSaveMediaMessage(
          quoted,
          "ppbot.jpeg"
        );
        if (args[0] == "full") {
          var { img } = await generateProfilePicture(medis);
          await Joshbot.query({
            tag: "iq",
            attrs: {
              to: botNumber,
              type: "set",
              xmlns: "w:profile:picture",
            },
            content: [
              {
                tag: "picture",
                attrs: {
                  type: "image",
                },
                content: img,
              },
            ],
          });
          fs.unlinkSync(medis);
          reply(mess.done);
        } else {
          var memeg = await Joshbot.updateProfilePicture(botNumber, {
            url: medis,
          });
          fs.unlinkSync(medis);
          reply(mess.done);
        }
        break;
      case "ss":
      case "ssweb":
        {
          if (!q) return reply(`Example ${prefix + command} link`);
          XeonStickWait();
          let krt = await scp1.ssweb(q);
          Joshbot.sendMessage(
            from,
            { image: krt.result, caption: mess.succes },
            { quoted: m }
          );
        }
        break;
      case "block":
        if (!isCreator) return reply(mess.owner);
        let blockw = m.mentionedJid[0]
          ? m.mentionedJid[0]
          : m.quoted
          ? m.quoted.sender
          : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
        await Joshbot.updateBlockStatus(blockw, "block")
          .then((res) => reply(json(res)))
          .catch((err) => reply(json(err)));
        break;
      case "unblock":
        if (!isCreator) return reply(mess.owner);
        let blockww = m.mentionedJid[0]
          ? m.mentionedJid[0]
          : m.quoted
          ? m.quoted.sender
          : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
        await Joshbot.updateBlockStatus(blockww, "unblock")
          .then((res) => reply(json(res)))
          .catch((err) => reply(json(err)));
        break;
      case "leave":
        if (!isCreator) return reply(mess.owner);
        if (!m.isGroup) return reply(mess.group);
        reply("🟨Bye Everyone 🥺");
        await Joshbot.groupLeave(m.chat);
        break;
      case "bcgc":
      case "bcgroup":
        {
          if (!isCreator) return reply(mess.owner);
          if (!text)
            return reply(
              `Which text?\n\nExample : ${
                prefix + command
              } It's holiday tomorrow `
            );
          let getGroups = await Joshbot.groupFetchAllParticipating();
          let groups = Object.entries(getGroups)
            .slice(0)
            .map((entry) => entry[1]);
          let anu = groups.map((v) => v.id);
          reply(
            `Send Broadcast To ${anu.length} Group Chat, End Time ${
              anu.length * 1.5
            } second`
          );
          for (let i of anu) {
            await sleep(1500);
            let a = "```" + `\n\n${text}\n\n` + "```" + "\n\n\nʙʀᴏᴀᴅᴄᴀsᴛ";
            Joshbot.sendMessage(i, {
              text: a,
              contextInfo: {
                externalAdReply: {
                  showAdAttribution: true,
                  title: "Broadcast By Owner",
                  body: `Sent ${i.length} Group`,
                  thumbnailUrl:
                    "https://telegra.ph/file/c02035e9c30f7b6da1b29.jpg",
                  sourceUrl: global.link,
                  mediaType: 1,
                  renderLargerThumbnail: true,
                },
              },
            });
          }
          reply(`Successfully Sent Broadcast To ${anu.length} Group`);
        }
        break;
      case "getcase":
        if (!isCreator) return reply(mess.owner);
        const getCase = (cases) => {
          return (
            "case" +
            `'${cases}'` +
            fs
              .readFileSync("JoshuaBug3.js")
              .toString()
              .split("case '" + cases + "'")[1]
              .split("break")[0] +
            "break"
          );
        };
        reply(`${getCase(q)}`);
        break;
      case "delete":
      case "del":
        {
          if (!isCreator) return reply(mess.done);
          if (!m.quoted) throw false;
          let { chat, fromMe, id, isBaileys } = m.quoted;
          if (!isBaileys) return reply("The message was not sent by the bot!");
          Joshbot.sendMessage(m.chat, {
            delete: {
              remoteJid: m.chat,
              fromMe: true,
              id: m.quoted.id,
              participant: m.quoted.sender,
            },
          });
        }
        break;

      case "Amute":
      case "amute":
        if (!m.isGroup) return reply(mess.group);
        if (!isAdmins && !isCreator) return reply(mess.admin);
        if (!isBotAdmins) return reply(mess.botAdmin);
        if (args[1] == "second") {
          var timer = args[0] * `1000`;
        } else if (args[1] == "minute") {
          var timer = args[0] * `60000`;
        } else if (args[1] == "hour") {
          var timer = args[0] * `3600000`;
        } else if (args[1] == "day") {
          var timer = args[0] * `86400000`;
        } else {
          return reply(
            "*Choose:*\nsecond\nminute\nhour\nday\n\n*Example*\n10 second"
          );
        }
        reply(`This group will be closed ${q} from now`);
        setTimeout(() => {
          var nomor = m.participant;
          const close = `*Closed* group closed by admin\nnow only admin can send messages`;
          Joshbot.groupSettingUpdate(m.chat, "announcement");
          reply(close);
        }, timer);
        break;
      case "Aunmute":
      case "aunmute":
        if (!m.isGroup) return reply(mess.group);
        if (!isAdmins && !isCreator) return reply(mess.admin);
        if (!isBotAdmins) return reply(mess.botAdmin);
        if (args[1] == "second") {
          var timer = args[0] * `1000`;
        } else if (args[1] == "minute") {
          var timer = args[0] * `60000`;
        } else if (args[1] == "hour") {
          var timer = args[0] * `3600000`;
        } else if (args[1] == "day") {
          var timer = args[0] * `86400000`;
        } else {
          return reply(
            "*Choose:*\nsecond\nminute\nhour\nday\n\n*Example*\n10 second"
          );
        }
        reply(`This group will be opened ${q} from now`);
        setTimeout(() => {
          var nomor = m.participant;
          const open = `*Opened* The group is opened by admin\nNow members can send messages`;
          Joshbot.groupSettingUpdate(m.chat, "not_announcement");
          reply(open);
        }, timer);
        break;
      case "kick":
        if (!m.isGroup) return reply(mess.group);
        if (!isAdmins && !isGroupOwner && !isCreator) return reply(mess.admin);
        if (!isBotAdmins) return reply(mess.botAdmin);
        let blockwww = m.mentionedJid[0]
          ? m.mentionedJid[0]
          : m.quoted
          ? m.quoted.sender
          : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
        await Joshbot.groupParticipantsUpdate(m.chat, [blockwww], "remove")
          .then((res) => reply(json(res)))
          .catch((err) => reply(json(err)));
        break;
      case "add":
        if (!m.isGroup) return reply(mess.group);
        if (!isAdmins && !isGroupOwner && !isCreator) return reply(mess.admin);
        if (!isBotAdmins) return reply(mess.botAdmin);
        let blockwwww = m.quoted
          ? m.quoted.sender
          : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
        await Joshbot.groupParticipantsUpdate(m.chat, [blockwwww], "add")
          .then((res) => reply(json(res)))
          .catch((err) => reply(json(err)));
        break;
      case "promote":
        if (!m.isGroup) return reply(mess.group);
        if (!isAdmins && !isGroupOwner && !isCreator) return reply(mess.admin);
        if (!isBotAdmins) return reply(mess.botAdmin);
        let blockwwwww = m.mentionedJid[0]
          ? m.mentionedJid[0]
          : m.quoted
          ? m.quoted.sender
          : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
        await Joshbot.groupParticipantsUpdate(m.chat, [blockwwwww], "promote")
          .then((res) => reply(json(res)))
          .catch((err) => reply(json(err)));
        break;
      case "demote":
        if (!m.isGroup) return reply(mess.group);
        if (!isAdmins && !isGroupOwner && !isCreator) return reply(mess.admin);
        if (!isBotAdmins) return reply(mess.botAdmin);
        let blockwwwwwa = m.mentionedJid[0]
          ? m.mentionedJid[0]
          : m.quoted
          ? m.quoted.sender
          : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
        await Joshbot.groupParticipantsUpdate(m.chat, [blockwwwwwa], "demote")
          .then((res) => reply(json(res)))
          .catch((err) => reply(json(err)));
        break;
      case "setname":
      case "setsubject":
      case "gname":
        if (!m.isGroup) return reply(mess.group);
        if (!isAdmins && !isGroupOwner && !isCreator) return reply(mess.admin);
        if (!isBotAdmins) return reply(mess.botAdmin);
        if (!text) return "Text ?";
        await Joshbot.groupUpdateSubject(m.chat, text)
          .then((res) => reply(mess.success))
          .catch((err) => reply(json(err)));
        break;
      case "setdesc":
      case "setdesk":
        if (!m.isGroup) return reply(mess.group);
        if (!isAdmins && !isGroupOwner && !isCreator) return reply(mess.admin);
        if (!isBotAdmins) return reply(mess.botAdmin);
        if (!text) return "Text ?";
        await Joshbot.groupUpdateDescription(m.chat, text)
          .then((res) => reply(mess.success))
          .catch((err) => reply(json(err)));
        break;
      case "setppgroup":
      case "setppgrup":
      case "setppgc":
      case "gpp":
        if (!m.isGroup) return reply(mess.group);
        if (!isAdmins) return reply(mess.admin);
        if (!isBotAdmins) return reply(mess.botAdmin);
        if (!quoted)
          return reply(`Send/Reply Image With Caption ${prefix + command}`);
        if (!/image/.test(mime))
          return reply(`Send/Reply Image With Caption ${prefix + command}`);
        if (/webp/.test(mime))
          return reply(`Send/Reply Image With Caption ${prefix + command}`);
        var medis = await Joshbot.downloadAndSaveMediaMessage(
          quoted,
          "ppbot.jpeg"
        );
        if (args[0] == "full") {
          var { img } = await generateProfilePicture(medis);
          await Joshbot.query({
            tag: "iq",
            attrs: {
              to: m.chat,
              type: "set",
              xmlns: "w:profile:picture",
            },
            content: [
              {
                tag: "picture",
                attrs: {
                  type: "image",
                },
                content: img,
              },
            ],
          });
          fs.unlinkSync(medis);
          reply(mess.done);
        } else {
          var memeg = await Joshbot.updateProfilePicture(m.chat, {
            url: medis,
          });
          fs.unlinkSync(medis);
          reply(mess.done);
        }
        break;
      case "tag":
      case "tagall":
      case "all":
        {
          if (!m.isGroup) return replay(mess.grouponly);
          if (!isAdmins && !isCreator) return replay(mess.useradmin);
          let teks = `𝗧𝗮𝗴𝗮𝗹𝗹
  
 *Message : ${args.join(" ") ? args.join(" ") : "no message"}*\n\n`;
          for (let mem of participants) {
            teks += ` @${mem.id.split("@")[0]}\n`;
          }
          Joshbot.sendMessage(
            m.chat,
            { text: teks, mentions: participants.map((a) => a.id) },
            { quoted: m }
          );
        }
        break;

      case "totag":
        if (!m.isGroup) return reply(mess.group);
        if (!isBotAdmins) return reply(mess.botAdmin);
        if (!isAdmins) return reply(mess.admin);
        if (!m.quoted)
          return reply(`Reply messages with captions ${prefix + command}`);
        Joshbot.sendMessage(m.chat, {
          forward: m.quoted.fakeObj,
          mentions: participants.map((a) => a.id),
        });
        break;

      case "ephemeral":
        {
          if (!m.isGroup) return reply(mess.group);
          if (!isBotAdmins) return reply(mess.botAdmin);
          if (!isAdmins) return reply(mess.admin);
          if (!text) return reply("Enter the value enable/disable");
          if (args[0] === "enable") {
            await Joshbot.sendMessage(m.chat, {
              disappearingMessagesInChat: WA_DEFAULT_EPHEMERAL,
            });
          } else if (args[0] === "disable") {
            await Joshbot.sendMessage(m.chat, {
              disappearingMessagesInChat: false,
            });
            await reply(`Done`);
          }
        }
        break;
      // case 'group':
      // case 'grup':
      //     if (!m.isGroup) return reply(mess.group)
      //     if (!isAdmins && !isGroupOwner && !isCreator) return reply(mess.admin)
      //     if (!isBotAdmins) return reply(mess.botAdmin)
      //     if (args[0] === 'mute') {
      //         await Joshbot.groupSettingUpdate(m.chat, 'announcement').then((res) => reply(`♠️Success In Closing The Group️`)).catch((err) => reply(json(err)))
      //     } else if (args[0] === 'unmute') {
      //         await Joshbot.groupSettingUpdate(m.chat, 'not_announcement').then((res) => reply(`Success In Opening The Group 🕊️`)).catch((err) => reply(json(err)))
      //     } else {
      //         reply(`Mode ${command}\n\n\nType ${prefix + command} unmute/mute`)
      //     }
      //     break

      case "unmute":
        if ((args[0] = "unmute")) {
          await Joshbot.groupSettingUpdate(m.chat, "not_announcement")
            .then((res) => reply(`*_Unmuted!_*`))
            .catch((err) => reply(json(err)));
        }

        break;

      case "mute":
        if ((args[0] = "mute")) {
          await Joshbot.groupSettingUpdate(m.chat, "announcement")
            .then((res) => reply(`*_Muted!_*`))
            .catch((err) => reply(json(err)));
        }
        break;

      case "editinfo":
        if (!m.isGroup) return reply(mess.group);
        if (!isAdmins && !isGroupOwner && !isCreator) return reply(mess.admin);
        if (!isBotAdmins) return reply(mess.botAdmin);
        if (args[0] === "open") {
          await Joshbot.groupSettingUpdate(m.chat, "unlocked")
            .then((res) => reply(`Successfully Opened Group Edit Info 🕊️`))
            .catch((err) => reply(json(err)));
        } else if (args[0] === "close") {
          await Joshbot.groupSettingUpdate(m.chat, "locked")
            .then((res) => reply(`Successfully Closed Group Edit Info🕊️`))
            .catch((err) => reply(json(err)));
        } else {
          reply(`Mode ${command}\n\n\nType ${prefix + command}on/off`);
        }
        break;
      case "grouplink":
      case "gclink":
        {
          if (!m.isGroup) return reply(mess.group);
          if (!isBotAdmins) return reply(mess.botAdmin);
          Joshbot.sendMessage(from, { react: { text: "🪄", key: m.key } });
          let response = await Joshbot.groupInviteCode(m.chat);
          Joshbot.sendMessage(
            m.chat,
            {
              text: `*Group Name:* *${groupMetadata.subject}* \n\n*Group Link :* \nhttps://chat.whatsapp.com/${response}l`,
              contextInfo: {
                // "forwardingScore": 1000000000,
                // isForwarded: true,
                // sendEphemeral: true,
              },
            },
            { quoted: m, detectLink: true }
          );
        }
        break;

      case "revoke":
      case "resetlink":
        if (!m.isGroup) return reply(mess.group);
        if (!isAdmins && !isGroupOwner && !isCreator) return reply(mess.admin);
        if (!isBotAdmins) return reply(mess.botAdmin);
        await Joshbot.groupRevokeInvite(m.chat)
          .then((res) => {
            reply(
              `Successful Reset, Group Invite Link ${groupMetadata.subject}`
            );
          })
          .catch((err) => reply(json(err)));
        break;

      case "owner":
        {
          const repf = await Joshbot.sendMessage(
            from,
            {
              contacts: {
                displayName: `${list.length} Contact`,
                contacts: list,
              },
              mentions: [sender],
            },
            { quoted: m }
          );
        }
        break;

      case "sticker":
        {
          if (!quoted)
            return reply(
              `Reply to Video/Image With Caption ${prefix + command}`
            );
          if (/image/.test(mime)) {
            let media = await quoted.download();
            let encmedia = await Joshbot.sendImageAsSticker(m.chat, media, m, {
              author: global.stickername,
            });
            await fs.unlinkSync(encmedia);
          } else if (isVideo || /video/.test(mime)) {
            if ((quoted.msg || quoted).seconds > 11)
              return reply("Maximum 10 seconds!");
            let media = await quoted.download();
            let encmedia = await Joshbot.sendVideoAsSticker(m.chat, media, m, {
              packname: global.stickername,
            });
            await fs.unlinkSync(encmedia);
          } else {
            return reply(
              `Send Images/Videos With Captions ${
                prefix + command
              }\nVideo Duration 1-9 Seconds`
            );
          }
        }
        break;
      case "smeme":
        {
          let respond = `Send/Reply image/sticker with caption ${
            prefix + command
          } text1|text2`;
          if (!/image/.test(mime)) return reply(respond);
          if (!text) return reply(respond);
          reply(mess.wait);
          atas = text.split("|")[0] ? text.split("|")[0] : "-";
          bawah = text.split("|")[1] ? text.split("|")[1] : "-";
          let dwnld = await Joshbot.downloadAndSaveMediaMessage(qmsg);
          let fatGans = await TelegraPh(dwnld);
          let smeme = `https://api.memegen.link/images/custom/${encodeURIComponent(
            bawah
          )}/${encodeURIComponent(atas)}.png?background=${fatGans}`;
          let pop = await Joshbot.sendImageAsSticker(m.chat, smeme, m, {
            packname: global.stickername,
          });
          fs.unlinkSync(pop);
        }
        break;
      case "take":
        {
          if (!args.join(" ")) return reply(`Where is the text?`);
          const swn = args.join(" ");
          const pcknm = swn.split("|")[0];
          const atnm = swn.split("|")[1];
          if (m.quoted.isAnimated === true) {
            Joshbot.downloadAndSaveMediaMessage(quoted, "gifee");
            Joshbot.sendMessage(
              from,
              { sticker: fs.readFileSync("gifee.webp") },
              { quoted: m }
            );
          } else if (/image/.test(mime)) {
            let media = await quoted.download();
            let encmedia = await Joshbot.sendImageAsSticker(m.chat, media, m, {
              packname: pcknm,
              author: atnm,
            });
          } else if (/video/.test(mime)) {
            if ((quoted.msg || quoted).seconds > 11)
              return reply("Maximum 10 Seconds!");
            let media = await quoted.download();
            let encmedia = await Joshbot.sendVideoAsSticker(m.chat, media, m, {
              packname: pcknm,
              author: atnm,
            });
          } else {
            reply(`Photo/Video?`);
          }
        }
        break;
      case "toimage":
      case "toimg":
        {
          if (!/webp/.test(mime))
            return reply(`Reply sticker with caption *${prefix + command}*`);
          reply(mess.wait);
          let media = await Joshbot.downloadAndSaveMediaMessage(qmsg);
          let ran = await getRandom(".png");
          exec(`ffmpeg -i ${media} ${ran}`, (err) => {
            fs.unlinkSync(media);
            if (err) return err;
            let buffer = fs.readFileSync(ran);
            Joshbot.sendMessage(
              m.chat,
              {
                image: buffer,
              },
              {
                quoted: m,
              }
            );
            fs.unlinkSync(ran);
          });
        }
        break;
      case "tomp4":
      case "tovideo":
        {
          if (!/webp/.test(mime))
            return reply(`Reply sticker with caption *${prefix + command}*`);
          reply(mess.wait);
          let media = await Joshbot.downloadAndSaveMediaMessage(qmsg);
          let webpToMp4 = await webp2mp4File(media);
          await Joshbot.sendMessage(
            m.chat,
            {
              video: {
                url: webpToMp4.result,
                caption: "Convert Webp To Video",
              },
            },
            {
              quoted: m,
            }
          );
          await fs.unlinkSync(media);
        }
        break;
      case "tomp3":
        {
          if (!/video/.test(mime) && !/audio/.test(mime))
            return reply(
              `Send/Reply Video/Audio that you want to make into MP3 with caption ${
                prefix + command
              }`
            );
          reply(mess.wait);
          let media = await Joshbot.downloadMediaMessage(qmsg);
          let audio = await toAudio(media, "mp4");
          Joshbot.sendMessage(
            m.chat,
            {
              document: audio,
              mimetype: "audio/mp3",
              fileName: `Joshbot-bot.mp3`,
            },
            {
              quoted: m,
            }
          );
        }
        break;
      case "tovn":
      case "toptt":
        {
          if (!/video/.test(mime) && !/audio/.test(mime))
            return reply(
              `Reply Video/Audio that you want to make into a VN with caption ${
                prefix + command
              }`
            );
          reply(mess.wait);
          let media = await Joshbot.downloadMediaMessage(qmsg);
          let { toPTT } = require("./Gallery/lib/converter");
          let audio = await toPTT(media, "mp4");
          Joshbot.sendMessage(
            m.chat,
            {
              audio: audio,
              mimetype: "audio/mpeg",
              ptt: true,
            },
            {
              quoted: m,
            }
          );
        }
        break;
      case "togif":
        {
          if (!/webp/.test(mime))
            return reply(`Reply sticker with caption *${prefix + command}*`);
          reply(mess.wait);
          let media = await Joshbot.downloadAndSaveMediaMessage(qmsg);
          let webpToMp4 = await webp2mp4File(media);
          await Joshbot.sendMessage(
            m.chat,
            {
              video: {
                url: webpToMp4.result,
                caption: "Convert Webp To Video",
              },
              gifPlayback: true,
            },
            {
              quoted: m,
            }
          );
          await fs.unlinkSync(media);
        }
        break;
      case "tourl":
        {
          reply(mess.wait);
          let media = await Joshbot.downloadAndSaveMediaMessage(qmsg);
          if (/image/.test(mime)) {
            let anu = await TelegraPh(media);
            reply(util.format(anu));
          } else if (!/image/.test(mime)) {
            let anu = await UploadFileUgu(media);
            reply(util.format(anu));
          }
          await fs.unlinkSync(media);
        }
        break;
      case "emojimix":
        {
          let [emoji1, emoji2] = text.split`+`;
          if (!emoji1) return reply(`Example : ${prefix + command} 😅+🤔`);
          if (!emoji2) return reply(`Example : ${prefix + command} 😅+🤔`);
          reply(mess.wait);
          let anu = await fetchJson(
            `https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(
              emoji1
            )}_${encodeURIComponent(emoji2)}`
          );
          for (let res of anu.results) {
            let encmedia = await Joshbot.sendImageAsSticker(
              m.chat,
              res.url,
              m,
              {
                packname: global.stickername,

                categories: res.tags,
              }
            );
            await fs.unlinkSync(encmedia);
          }
        }
        break;
      case "tovv":
      case "toviewonce":
        {
          if (!quoted) return reply(`Reply Image/Video`);
          if (/image/.test(mime)) {
            anuan = await Joshbot.downloadAndSaveMediaMessage(quoted);
            Joshbot.sendMessage(
              m.chat,
              {
                image: {
                  url: anuan,
                },
                caption: `Here you go!`,
                fileLength: "999",
                viewOnce: true,
              },
              {
                quoted: m,
              }
            );
          } else if (/video/.test(mime)) {
            anuanuan = await Joshbot.downloadAndSaveMediaMessage(quoted);
            Joshbot.sendMessage(
              m.chat,
              {
                video: {
                  url: anuanuan,
                },
                caption: `Here you go!`,
                fileLength: "99999999",
                viewOnce: true,
              },
              {
                quoted: m,
              }
            );
          }
        }
        break;
      case "toqr":
        {
          if (!q) return reply(" Please include link or text!");
          const QrCode = require("qrcode-reader");
          const qrcode = require("qrcode");
          let qyuer = await qrcode.toDataURL(q, {
            scale: 35,
          });
          let data = new Buffer.from(
            qyuer.replace("data:image/png;base64,", ""),
            "base64"
          );
          let buff = getRandom(".jpg");
          await fs.writeFileSync("./" + buff, data);
          let medi = fs.readFileSync("./" + buff);
          await Joshbot.sendMessage(
            from,
            {
              image: medi,
              caption: "Here you go!",
            },
            {
              quoted: m,
            }
          );
          setTimeout(() => {
            fs.unlinkSync(buff);
          }, 10000);
        }
        break;
      case "fliptext":
        {
          if (args.length < 1)
            return reply(`Example:\n${prefix}fliptext Joshuay`);
          quere = args.join(" ");
          flipe = quere.split("").reverse().join("");
          reply(
            `\`\`\`「 FLIP TEXT 」\`\`\`\n*•> Normal :*\n${quere}\n*•> Flip :*\n${flipe}`
          );
        }
        break;

      case "addowner":
        if (!isCreator) return reply(mess.owner);
        if (!args[0])
          return reply(
            `Use ${prefix + command} number\nExample ${
              prefix + command
            } ${ownernumber}`
          );
        bnnd = q.split("|")[0].replace(/[^0-9]/g, "");
        let ceknye = await Joshbot.onWhatsApp(bnnd);
        if (ceknye.length == 0)
          return reply(`Enter A Valid And Registered Number On WhatsApp!!!`);
        owner.push(bnnd);
        fs.writeFileSync(
          "./Gallery/database/owner.json",
          JSON.stringify(owner)
        );
        reply(`Number ${bnnd} Has Become An owner!!!`);
        break;
      case "delowner":
        if (!isCreator) return reply(mess.owner);
        if (!args[0])
          return reply(
            `Use ${prefix + command} nomor\nExample ${
              prefix + command
            } 919931122319`
          );
        ya = q.split("|")[0].replace(/[^0-9]/g, "");
        unp = owner.indexOf(ya);
        owner.splice(unp, 1);
        fs.writeFileSync(
          "./Gallery/database/owner.json",
          JSON.stringify(owner)
        );
        reply(
          `The Numbrr ${ya} Has been deleted from owner list by the owner!!!`
        );
        break;

      case "afk":
        if (!m.isGroup) return reply(mess.group);
        if (isAfkOn) return reply("Already afk");
        let reason = text ? text : "Nothing.";
        afk.addAfkUser(m.sender, Date.now(), reason, _afk);
        reply(
          `@${m.sender.split("@")[0]} Currently AFK\nWith reason : ${reason}`
        );
        break;
      case "qc":
        {
          const { quote } = require("./Gallery/lib/quote.js");
          if (!q) return reply("Enter Text");
          let ppnyauser = await await Joshbot.profilePictureUrl(
            m.sender,
            "image"
          ).catch((_) => "https://telegra.ph/file/6880771a42bad09dd6087.jpg");
          const rest = await quote(q, pushname, ppnyauser);
          reply(mess.wait);
          Joshbot.sendImageAsSticker(m.chat, rest.result, m, {
            packname: `${global.stickername}`,
          });
        }
        break;
      case "play":
      case "song":
        {
          if (!text)
            return reply(`Example : ${prefix + command} anime whatsapp status`);
          const Joshuaplaymp3 = require("./Gallery/lib/ytdl2");
          let yts = require("youtube-yts");
          let search = await yts(text);
          let anup3k = search.videos[0];
          const pl = await Joshuaplaymp3.mp3(anup3k.url);
          m.reply("```Song found! Sending...```");
          await Joshbot.sendMessage(
            m.chat,
            {
              audio: fs.readFileSync(pl.path),
              fileName: anup3k.title + ".mp3",
              mimetype: "audio/mp4",
              ptt: true,
              contextInfo: {
                externalAdReply: {
                  title: anup3k.title,
                  body: botname,
                  thumbnail: await fetchBuffer(pl.meta.image),
                  mediaType: 2,
                  mediaUrl: anup3k.url,
                },
              },
            },
            { quoted: m }
          );
          await fs.unlinkSync(pl.path);
        }
        break;

      case "ytmp3":
      case "ytaudio":
        const Joshuaaudp3 = require("./Gallery/lib/ytdl2");
        if (args.length < 1 || !isUrl(text) || !Joshuaaudp3.isYTUrl(text))
          return reply(
            `Where's the yt link?\nExample: ${
              prefix + command
            } https://youtube.com/shorts/YQf-vMjDuKY?feature=share`
          );
        const audio = await Joshuaaudp3.mp3(text);
        await Joshbot.sendMessage(
          m.chat,
          {
            audio: fs.readFileSync(audio.path),
            mimetype: "audio/mp4",
            ptt: true,
            contextInfo: {
              externalAdReply: {
                title: audio.meta.title,
                body: botname,
                thumbnail: await fetchBuffer(audio.meta.image),
                mediaType: 2,
                mediaUrl: text,
              },
            },
          },
          { quoted: m }
        );
        await fs.unlinkSync(audio.path);
        break;
      case "ytmp4":
      case "ytvideo":
        {
          const Joshuavidoh = require("./Gallery/lib/ytdl2");
          if (args.length < 1 || !isUrl(text) || !Joshuavidoh.isYTUrl(text))
            reply(
              `Where is the link??\n\nExample : ${
                prefix + command
              } https://youtube.com/watch?v=PtFMh6Tccag%27 128kbps`
            );
          const vid = await Joshuavidoh.mp4(text);
          const ytc = `
*${themeemoji}Tittle:* ${vid.title}
*${themeemoji}Date:* ${vid.date}
*${themeemoji}Duration:* ${vid.duration}
*${themeemoji}Quality:* ${vid.quality}`;
          await Joshbot.sendMessage(
            m.chat,
            {
              video: { url: vid.videoUrl },
              caption: ytc,
            },
            { quoted: m }
          );
        }
        break;
      ///////////////////////////////////////////////////

      case "gpt":
        {
          Joshbot.sendMessage(from, { react: { text: "🤖", key: m.key } });
          if (!q)
            return reply(
              `Please provide a text query. Example: ${
                prefix + command
              } Hello, ChatGPT!`
            );

          const apiUrl1 = `https://vihangayt.me/tools/chatgpt?q=${encodeURIComponent(
            q
          )}`;
          const apiUrl2 = `https://gurugpt.cyclic.app/gpt4?prompt=${encodeURIComponent(
            q
          )}&model=llama`;

          try {
            const response1 = await fetch(apiUrl1);
            const responseData1 = await response1.json();

            if (
              response1.status === 200 &&
              responseData1 &&
              responseData1.status === true &&
              responseData1.data
            ) {
              const message = responseData1.data;
              const me = m.sender;
              await Joshbot.sendMessage(
                m.chat,
                { text: message, mentions: [me] },
                { quoted: m }
              );
            } else {
              const response2 = await fetch(apiUrl2);
              const responseData2 = await response2.json();

              if (
                response2.status === 200 &&
                responseData2 &&
                responseData2.data
              ) {
                const message = responseData2.data;
                const me = m.sender;
                await Joshbot.sendMessage(
                  m.chat,
                  { text: message, mentions: [me] },
                  { quoted: m }
                );
              } else {
                reply(
                  "Sorry, I couldn't fetch a response from both APIs at the moment."
                );
              }
            }
          } catch (error) {
            console.error(error);
            reply(
              "An error occurred while fetching the response from both APIs."
            );
          }
        }
        break;

      case "dalle":
        {
          if (!q)
            return reply(
              `Please provide a query to generate an image. Example: ${
                prefix + command
              } Beautiful landscape`
            );

          const apiUrl = `https://gurugpt.cyclic.app/dalle?prompt=${encodeURIComponent(
            q
          )}`;

          try {
            await Joshbot.sendMessage(
              m.chat,
              { image: { url: apiUrl } },
              { quoted: m }
            );
          } catch (error) {
            console.error(error);
            reply("An error occurred while generating the image.");
          }
        }
        break;

      case "hd":
        {
          if (!quoted) return reply(`Where is the picture?`);
          if (!/image/.test(mime))
            return reply(`Send/Reply Photos With Captions ${prefix + command}`);
          reply(mess.wait);
          const { remini } = require("./Gallery/lib/remini");
          let media = await quoted.download();
          let proses = await remini(media, "enhance");
          Joshbot.sendMessage(
            m.chat,
            { image: proses, caption: mess.done },
            { quoted: m }
          );
        }
        break;

      case "img":
      case "Img":
        {
          if (!args.join(" "))
            return reply(`${pushname} Please provide a search term!`);
          reply(mess.waiting);
          let { pinterest } = require("./Gallery/lib/scraper");
          let anutrest = await pinterest(text);
          let results = [];

          // Get multiple random images (let's say 5 images)
          const numImages = 5;
          for (let i = 0; i < numImages && i < anutrest.length; i++) {
            results.push(anutrest[Math.floor(Math.random() * anutrest.length)]);
          }
          reply(`Loading ${numImages} Inages of *${text}*`);

          // Send each image without any caption
          for (let i = 0; i < results.length; i++) {
            Joshbot.sendMessage(
              m.chat,
              { image: { url: results[i] } },
              { quoted: m }
            );
          }
        }
        break;

      case "rules":
        const helptxt = `_*📍[Rules for Joshbot Md usage]📍*_\n\n\n*>>>* use -support to get the Official group link in your dm.\n\n*--->* If you want to add Joshbot-Md in your group the contact the owner by *-owner/-mods* \n\n*--->* Dont use wrong command, use the command given in the *-help* list \n\n* Dont spam the bot with commands if Joshbot-Md is not responding, its means the maybe owner is offline or facing internet issue. \n\n*IF YOU DONT FOLLOW THE RULES THEN YOU WILL BE BANNED* 🚫 \n\n\n*©️ Joshua Bots inc* `;

        Joshbot.sendMessage(
          from,
          {
            video: { url: "https://c.tenor.com/geMdtLCXZkAAAAPo/rules.mp4" },
            gifPlayback: true,
            caption: helptxt,
          },
          { quoted: m }
        );

        break;
      case "hii":
      case "hi":
      case "Hi":
        let txxt = `👋🏻 Hi *${pushname}*, i am  *Joshbot-Md*📍\nA whatsapp bot created by: Joshua \n\n I don't have time for chit-chat. Use command from *${prefix}help* list if you want me to do anything.`;

        Joshbot.sendMessage(
          m.chat,
          {
            image: { url: "./Gallery/ch1.jpg" },
            caption: txxt,
            gifPlayback: true,
          },
          { quoted: m }
        );
        break;
      case "support":
        let tex = `📍My Developer's Group📍\n\n*🎇 BOTS support group:🎇*\n\n**`;

        await Joshbot.sendMessage(m.sender, { text: `${tex}` });

        await Joshbot.sendMessage(
          m.chat,
          {
            image: { url: "./Gallery/ch2.jpg" },
            caption:
              "I sent you the support Link in personal message.\n Pls check.",
            gifPlayback: true,
          },
          { quoted: m }
        );
        break;

      case "info":
        let ifx = `『Joshbot-𝕄𝕕 』
*🌟Description:* A WhatsApp Bot With Rich features based on Joshbot
*🚦Uptime:* ${runtime(process.uptime())}
*🕸Version:* 1.2.0
*👤Creator:*  JOSHUA\n
*Powered by Joshua*`;
        Joshbot.sendMessage(
          m.chat,
          {
            image: { url: "./Gallery/ch3.jpg" },
            caption: ifx,
            gifPlayback: true,
          },
          { quoted: m }
        );
        break;

      case "owner":
      case "creator":
      case "mod":
      case "mods":
        {
          Joshbot.sendContact(m.chat, global.Owner, m);
        }

        break;

      ///////////////////////////////////////////////////
      case "google":
        {
          if (!q) return reply(`Example : ${prefix + command} JOSHUA`);
          let google = require("google-it");
          google({ query: text }).then((res) => {
            let teks = `「*Google Search Engine*」 \n\n
`;
            for (let g of res) {
              teks += `*Title* : ${g.title}\n`;
              teks += `*Description* : ${g.snippet}\n`;
              teks += `*Link* : ${g.link}\n\n────────────────────\n\n`;
            }
            reply(teks);
          });
        }
        break;

      case "wanumber":
      case "nowa":
      case "searchnumber":
        {
          if (!text)
            return reply(
              `Enter a number ending with 'x'\n\nExample: ${
                prefix + command
              } 234931187223xx`
            );
          var inputnumber = text.split(" ")[0];

          reply(`📱 Exploring for WhatsApp accounts within the range...`);
          function countInstances(string, word) {
            return string.split(word).length - 1;
          }
          var number0 = inputnumber.split("x")[0];
          var number1 = inputnumber.split("x")[countInstances(inputnumber, "x")]
            ? inputnumber.split("x")[countInstances(inputnumber, "x")]
            : "";
          var random_length = countInstances(inputnumber, "x");
          var randomxx;
          if (random_length == 1) {
            randomxx = 10;
          } else if (random_length == 2) {
            randomxx = 100;
          } else if (random_length == 3) {
            randomxx = 1000;
          }
          var text66 = `*WhatsApp Numbers Directory*\n\n`;
          var nobio = `\n*Bio:* || \nHey there! I am using WhatsApp.\n`;
          var nowhatsapp = `\n*Numbers with no WhatsApp account within provided range.*\n`;
          for (let i = 0; i < randomxx; i++) {
            var nu = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
            var status1 = nu[Math.floor(Math.random() * nu.length)];
            var status2 = nu[Math.floor(Math.random() * nu.length)];
            var status3 = nu[Math.floor(Math.random() * nu.length)];
            var dom4 = nu[Math.floor(Math.random() * nu.length)];
            var random21;
            if (random_length == 1) {
              random21 = `${status1}`;
            } else if (random_length == 2) {
              random21 = `${status1}${status2}`;
            } else if (random_length == 3) {
              random21 = `${status1}${status2}${status3}`;
            } else if (random_length == 4) {
              random21 = `${status1}${status2}${status3}${dom4}`;
            }
            var anu = await Joshbot.onWhatsApp(
              `${number0}${i}${number1}@s.whatsapp.net`
            );
            var anuu = anu.length !== 0 ? anu : false;
            try {
              try {
                var anu1 = await Joshbot.fetchStatus(anu[0].jid);
              } catch {
                var anu1 = "401";
              }
              if (anu1 == "401" || anu1.status.length == 0) {
                nobio += `wa.me/${anu[0].jid.split("@")[0]}\n`;
              } else {
                text66 += `*Number:* wa.me/${
                  anu[0].jid.split("@")[0]
                }\n  ️*Bio :* ${anu1.status}\n*Last update :* ${moment(
                  anu1.setAt
                )
                  .tz("Asia/Kolkata")
                  .format("HH:mm:ss DD/MM/YYYY")}\n\n`;
              }
            } catch {
              nowhatsapp += `${number0}${i}${number1}\n`;
            }
          }
          reply(`${text66}${nobio}${nowhatsapp}`);
        }
        break;
      case "menu":
      case "help":
        const txt = `╭━──═❮ *${botname}* ❯═─┈•
┃╭━━━━━━━━━━━━━━
┃┃ User :- ${pushname}
┃┃ Owner :- ${ownername}
┃┃ Version: 1.2.1
┃┃ Prefix:- (${prefix})
┃┃ MODE :- private 
┃┃ Time :${time2}
┃┃ RAM:- ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}
┃┃ PLATFORM:- ${os.platform()}
┃╰━━━━━━━━━━━━━
┠┌─═❮ *GENERAL* ❯═─┈•
┃│◦ MENU
┃│◦ ALIVE
┃│◦ PING
┃│◦ RUNTIME 
┃│◦ IMG
┃│◦ SERVER
┃└──────────
┠┌─═❮ *AI* ❯═─┈•
┃│◦ ɢᴘᴛ
┃│◦ DALLE
┃└──────────
┠┌─═❮ *GROUP* ❯═─┈•
┃│◦ ANTILINK 
┃│◦ AUTOMUTE
┃│◦ AUTOUNMUTE
┃│◦ KICK
┃│◦ ADD
┃│◦ PROMOTE
┃│◦ DEMOTE
┃│◦ GPP
┃│◦ TAGALL
┃│◦ HIDETAG
┃│◦ TOTAG
┃│◦ MUTE
┃│◦ EDITINFO
┃│◦ INVITE
┃│◦ REVOKE
┃│◦ LISTONLINE 
┃└──────────
┠┌─═❮ *OWNER* ❯═─┈•
┃│◦ SESSION 
┃│◦ JOIN
┃│◦ SHUTDOWN 
┃│◦ RESTART
┃│◦ AUTOREAD
┃│◦ AUTOBIO
┃│◦ AUTOTYPING 
┃│◦ AUTOREACORDING
┃│◦ AUTOSTATUSVIEW
┃│◦ MODE
┃│◦ BLOCK
┃│◦ UNBLOCK
┃│◦ BACKUP
┃│◦ GETCASE
┃│◦ ADDOWNER 
┃│◦ DELOWNER
┃│◦ REQUEST
┃│◦ SETBOTNAME
┃│◦ SETAUTOBIO
┃│◦ EPHEMERAL
┃└──────────
┠┌─═❮ *OTHERS* ❯═─┈•
┃│◦ STICKER 
┃│◦ TTS
┃│◦ QC
┃│◦ SMEME
┃│◦ TAKE
┃│◦ TOIMAGE
┃│◦ TOAUDIO 
┃│◦ TOVIDEO
┃│◦ TOMP3
┃│◦ TOVN
┃│◦ TOURL
┃│◦ TOGIF
┃│◦ TOQR
┃│◦ TOVIEWONCE
┃│◦ FLIPTEXT
┃│◦ EMOJIMIX
┃│◦ PLAY
┃│◦ YTMP3 
┃│◦ YTMP4 
┃│◦ CIRCLEVIDEO 
┃│◦ GOOGLE
┃│◦ APK
┠┌─═❮ *AUDIO EDITOR* ❯═─┈•
┃│◦ BASS
┃│◦ DEEP
┃│◦ BLOWN
┃│◦ FAST
┃│◦ FAT
┃│◦ EARRAPE
┃│◦ NIGHTCORE
┃│◦ ROBOT
┃│◦ REVERSE
┃│◦ SLOW
┃│◦ SMOOTH
┃│◦ SQUIRREL
┃└──────────
╰━━━━━━━━━━━━━
`;
        const Joshbotarray = [
          "https://telegra.ph/file/a979e37a8d2971c088ff4.jpg",
          "https://telegra.ph/file/2a1939dd4157aa5832cc0.jpg",
          "https://telegra.ph/file/3b13d4f143cec77d49c8f.jpg",
          "https://telegra.ph/file/b4a2abb0edb80ef663ce2.jpg",
          "https://telegra.ph/file/99dabefbd7f7832526a97.jpg",
        ];

        const Joshbotselection =
          Joshbotarray[Math.floor(Math.random() * Joshbotarray.length)];

        Joshbot.sendMessage(
          from,
          {
            image: { url: "./Gallery/ch2.jpg" },
            caption: txt,
          },
          { quoted: m }
        );

        break;
      case "bass":
      case "blown":
      case "deep":
      case "earrape":
      case "fast":
      case "fat":
      case "nightcore":
      case "reverse":
      case "robot":
      case "slow":
      case "smooth":
      case "squirrel":
        try {
          let set;
          if (/bass/.test(command))
            set = "-af equalizer=f=54:width_type=o:width=2:g=20";
          if (/blown/.test(command)) set = "-af acrusher=.1:1:64:0:log";
          if (/deep/.test(command)) set = "-af atempo=4/4,asetrate=44500*2/3";
          if (/earrape/.test(command)) set = "-af volume=12";
          if (/fast/.test(command))
            set = '-filter:a "atempo=1.63,asetrate=44100"';
          if (/fat/.test(command))
            set = '-filter:a "atempo=1.6,asetrate=22100"';
          if (/nightcore/.test(command))
            set = "-filter:a atempo=1.06,asetrate=44100*1.25";
          if (/reverse/.test(command)) set = '-filter_complex "areverse"';
          if (/robot/.test(command))
            set =
              "-filter_complex \"afftfilt=real='hypot(re,im)*sin(0)':imag='hypot(re,im)*cos(0)':win_size=512:overlap=0.75\"";
          if (/slow/.test(command))
            set = '-filter:a "atempo=0.7,asetrate=44100"';
          if (/smooth/.test(command))
            set =
              "-filter:v \"minterpolate='mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120'\"";
          if (/squirrel/.test(command))
            set = '-filter:a "atempo=0.5,asetrate=65100"';
          if (/audio/.test(mime)) {
            reply(mess.wait);
            let media = await Joshbot.downloadAndSaveMediaMessage(quoted);
            let ran = getRandom(".mp3");
            exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
              fs.unlinkSync(media);
              if (err) return reply(err);
              let buff = fs.readFileSync(ran);
              Joshbot.sendMessage(
                m.chat,
                { audio: buff, mimetype: "audio/mpeg" },
                { quoted: m }
              );
              fs.unlinkSync(ran);
            });
          } else
            reply(
              `Reply to the audio you want to change with a caption *${
                prefix + command
              }*`
            );
        } catch (e) {
          reply(e);
        }
        break;
      case "say":
      case "tts":
      case "gtts": {
        if (!text) return reply("Where is the text?");
        let texttts = text;
        const xeonrl = googleTTS.getAudioUrl(texttts, {
          lang: "en",
          slow: false,
          host: "https://translate.google.com",
        });
        return Joshbot.sendMessage(
          m.chat,
          {
            audio: {
              url: xeonrl,
            },
            mimetype: "audio/mp4",
            ptt: true,
            fileName: `${text}.mp3`,
          },
          {
            quoted: m,
          }
        );
      }
      case "circlevideo":
        {
          try {
            const Joshbotbaileys =
              await require("@whiskeysockets/baileys").generateWAMessageContent(
                { video: await m.quoted.download() },
                { upload: Joshbot.waUploadToServer }
              );
            await Joshbot.relayMessage(
              from,
              { ptvMessage: { ...Joshbotbaileys.videoMessage } },
              {}
            );
          } catch (err) {
            reply(`Reply to a Video with Caption ${prefix + command}`);
          }
        }
        break;
      case "runtime":
        {
          Joshbot.sendMessage(from, { react: { text: "🔖", key: m.key } });

          let lowq = `*The Bot Has Been Online For:*\n*${runtime(
            process.uptime()
          )}*`;
          reply(lowq);
        }
        break;

        //         case 'alive':{
        //             let ownernya = ownernumber + '@s.whatsapp.net'
        //             let me = m.sender
        //             let timestampe = speed()
        //             let latensie = speed() - timestampe
        //             xeonezy = `┌─❖
        // │ Hi 👋
        // └┬❖  ${pushname}
        // ┌┤✑  ${xeonytimewisher} 😄
        // │└────────────┈ ⳹
        // │
        // └─ 𝘽𝙊𝙏 𝙄𝙉𝙁𝙊
        // │𝗦𝗽𝗲𝗲𝗱 : ${latensie.toFixed(4)} miliseconds
        // │𝗥𝘂𝗻𝘁𝗶𝗺𝗲 : ${runtime(process.uptime())}
        // │𝗕𝗼𝘁 : ${global.botname}
        // │𝗢𝘄𝗻𝗲𝗿 𝗡𝗼: ${ownernumber}
        // │𝗣𝗿𝗲𝗳𝗶𝘅 :  ${prefix}
        // │𝗠𝗼𝗱𝗲 : ${Joshbot.public ? 'Public' : `Self`}
        // │𝗛𝗼𝘀𝘁 𝗡𝗮𝗺𝗲 : ${os.hostname()}
        // │𝗣𝗹𝗮𝘁𝗳𝗼𝗿𝗺 : ${os.platform()}
        // │
        // └─ 𝙐𝙎𝙀𝙍 𝙄𝙉𝙁𝙊
        // │𝗡𝗮𝗺𝗲 : ${pushname}
        // │𝗡𝘂𝗺𝗯𝗲𝗿 : @${me.split('@')[0]}
        // │
        // └─ 𝙏𝙄𝙈𝙀 𝙄𝙉𝙁𝙊
        // │𝗧𝗶??𝗲 : ${xtime}
        // │𝗗𝗮𝘁𝗲 : ${xdate}
        // └────────────┈ ⳹`
        //         }
        break;
      case "request":
      case "reportbug":
        {
          if (!text)
            return reply(
              `Example : ${prefix + command} hi dev play command is not working`
            );
          textt = `*| REQUEST/BUG |*`;
          teks1 = `\n\n*User* : @${
            m.sender.split("@")[0]
          }\n*Request/Bug* : ${text}`;
          teks2 = `\n\n*Hii ${pushname},You request has been forwarded to my Owners*.\n*Please wait...*`;
          for (let i of owner) {
            Joshbot.sendMessage(
              i + "@s.whatsapp.net",
              {
                text: textt + teks1,
                mentions: [m.sender],
              },
              {
                quoted: m,
              }
            );
          }
          Joshbot.sendMessage(
            m.chat,
            {
              text: textt + teks2 + teks1,
              mentions: [m.sender],
            },
            {
              quoted: m,
            }
          );
        }

        break;

      case "setbotname":
        {
          if (!isCreator) return reply(mess.owner);
          if (!text)
            return reply(
              `Where is the name?\nExample: ${prefix + command} JOSH-BOT`
            );
          await Joshbot.updateProfileName(text);
          reply(`Success in changing the name of bot's number`);
        }
        break;

      case "setautobio":
        {
          if (!isCreator) return reply(mess.owner);
          if (!text)
            return reply(
              `Where is the text?\nExample: ${prefix + command} Cheems Bot`
            );
          await Joshbot.updateProfileStatus(text);
          reply(`Success in changing bio `);
        }
        break;

      case "apk":
      case "apkdl":
        {
          if (!text) return reply("What apk u wanna download?");
          let resMaria = await fetch(
            `https://vihangayt.me/download/apk?id=${text}`
          );
          let jsonJoshbot = await resJoshbot.json();
          Maria.sendMessage(
            from,
            {
              document: { url: jsonMaria.data.dllink },
              fileName: jsonMaria.data.name,
              mimetype: "application/vnd.android.package-archive",
            },
            { quoted: m }
          ).catch(console.error);
        }
        break;

      case "ping": {
        // Record the start time just before sending the command
        const startTime = new Date();

        const processingTime = getRandomProcessingTime();
        await sleep(processingTime);

        const endTime = new Date();

        const pingTime = endTime - startTime;

        reply(`*Pong!* ${pingTime} ms`);
        break;
      }

      default:
         if (budy.startsWith('=>')) {
          if (!isCreator) return reply(mess.botowner)
          function Return(sul) {
            sat = JSON.stringify(sul, null, 2)
            bang = util.format(sat)
            if (sat == undefined) {
              bang = util.format(sul)
            }
            return reply(bang)
          }
          try {
            reply(util.format(eval(`(async () => { ${budy.slice(3)} })()`)))
          } catch (e) {
            Joshbot.sendMessage(from, { image: ErrorPic, caption: String(e) }, { quoted: m })
          }
        }
        if (budy.startsWith('>')) {
          if (!isCreator) return reply(mess.botowner)
          try {
            let evaled = await eval(budy.slice(2))
            if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
            await reply(evaled)
          } catch (err) {
            await Joshbot.sendMessage(from, { image: ErrorPic, caption: String(err) }, { quoted: m })
          }
        }


        if (budy.startsWith('$')) {
          if (!isCreator) return reply(mess.botowner)
          exec(budy.slice(2), (err, stdout) => {
            if (err) return Joshbot.sendMessage(from, { image: ErrorPic, caption: String(err) }, { quoted: m })
            if (stdout) return replyH(stdout)
          })
        }


        if (isCmd && budy.toLowerCase() != undefined) {
          if (m.chat.endsWith('broadcast')) return
          if (m.isBaileys) return
          let msgs = global.db.database
          if (!(budy.toLowerCase() in msgs)) return
          Joshbot.copyNForward(m.chat, msgs[budy.toLowerCase()], true)
        }
    }
  } catch (err) {
    Joshbot.sendMessage(`${ownertag}@s.whatsapp.net`, util.format(err), { quoted: m })
    console.log(err)
  }
}

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});

process.on("uncaughtException", function (err) {
  let e = String(err);
  if (e.includes("Socket connection timeout")) return;
  if (e.includes("item-not-found")) return;
  if (e.includes("rate-overlimit")) return;
  if (e.includes("Connection Closed")) return;
  if (e.includes("Timed Out")) return;
  if (e.includes("Value not found")) return;
  console.log("Caught exception: ", err);
});
