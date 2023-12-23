const fs = require('fs')
const chalk = require('chalk')

//contact details
global.ownernumber =  "2348050907760"
global.ownername = "Joshua"
global.ytname = "YT: JOSHUA.INC"
global.socialm = "GitHub: Alexmedia23"
global.location = "Nigeria"

global.ownername = 'JOSHUA' //owner name
global.botname = 'JOSH-MD' //name of the bot

//sticker details
global.stickername = '𓆩‎✘JOSHUA✘𓆪_✰'
global.packname = 'Sticker By'
global.author = 'josh Bot'
//console view/theme
global.themeemoji = '🧩'
global.wm = "josh bots inc."

//theme link
global.link = ''

//custom prefix
global.prefix = ['.']

//false=disable and true=enable
global.autoRecording = false //auto recording
global.autoTyping = false //auto typing
global.autorecordtype = false //auto typing + recording
global.autoread = false //auto read messages
global.autobio = false //auto update bio
global.anti212 = true //auto block +212
global.autoread_status = false //auto view status/story



//reply messages
global.mess = {
    done: 'success',
    prem: 'This feature can be used by premium user only',
    admin: 'This feature can be used by admin only',
    botAdmin: 'This feature can only be used when the bot is a group admin ',
    owner: 'This feature can be used by owner only',
    group: 'This feature is only for groups',
    private: 'This feature is only for private chats',
    wait: 'In process... ',    
    error: 'Error!',
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update'${__filename}'`))
    delete require.cache[file]
    require(file)
})
