const fs = require('fs')
require("dotenv").config();
const chalk = require('chalk')

module.exports = {
    botname: process.env.BotName || "JOSH-MD", 
    author: process.env.Author || "josh Bot",
    packname: process.env.PackName || "Joshbot-MD",
    prefa: process.env.Prefix || ['.'],
    themeemoji: process.env.ThemeEmoji || "🧩",
    ownername: process.env.Owner_Name || "Joshua",
    ownernumber: process.env.Owner_Number || "2348050907760",
    ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "true",
    RECORDING:process.env.RECORDING || "false",
    autoTyping :process.env.Auto_typing || "false",
    AUTO_READ :process.env.AUTO_READ || "false",
  }

  // Ignore them 👇🏻
  global.botname = process.env.BotName || "JOSH-MD" 
  global.author = process.env.Author || "josh Bot" 
  global.packname = process.env.PackName || "Joshbot-MD" 
  global.footer = process.env.Footer || "© Queen Anya Bot" 
  global.prefa = process.env.Prefix || ['.'] 
  global.themeemoji = process.env.ThemeEmoji || "🧩" 
  global.ownername = process.env.Owner_Name || "Joshua" 
  global.ownernumber = process.env.Owner_Number || "2348050907760" 
  global.RECORDING = process.env.RECORDING || "false"
  global.ALWAYS_ONLINE = process.env.ALWAYS_ONLINE || "true"
  global.autoTyping = process.env.Auto_typing || "false"
  global.AUTO_READ = process.env.AUTO_READ || "false"
  

global.ytname = "YT: JOSHUA.INC"
global.socialm = "GitHub: Alexmedia23"
global.location = "Nigeria"
global.stickername = '✘JOSHUA✘𓆪'
global.link = ''
 //auto typing + recording
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
