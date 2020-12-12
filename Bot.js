const { Client, Intents } = require('discord.js')
const intents = new Intents([Intents.NON_PRIVILEGED, "GUILD_MEMBERS"])

const config = require('./config.json')
const commands = require('./commands') //? bot command folder, each command imported in commands/index.js

class Bot {
    constructor(addCommands) {
        this.config = config
        this.client = new Client({ ws: { intents } })
        //! Option for lightweight client if needed
        if (addCommands) this.addCommands()
    }
    static addCommands() {
        for (const c in commands) {
            if (!this.hasOwnProperty[c]) this[c] = commands[c]
        }
        this.parseCommand = function(message){
            const args = message.content.slice(bB.config.prefix.length).trim().split(/ +/g)
            const command = args.shift().toLowerCase()
            return [command, args]
        }
        this.botCommand = function(mes, args, com){
            if(bB.hasOwnProperty(com)){
                try {
                    bB[com](mes, args, bB)
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }
}
try {
    module.exports = Bot
} catch (error) {
    module.exports = null
}
