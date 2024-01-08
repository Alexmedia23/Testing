const {Joshbot}= require('../lib/plugins')

Joshbot({
    name: "text"
    },
    async (Joshbot) => {
    await Joshbot.sendMessage(Josh.chat, { text:"✅ Working" });
    }
    )