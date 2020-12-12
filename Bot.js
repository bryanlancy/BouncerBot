const { Client, Intents } = require('discord.js')
const intents = new Intents([Intents.NON_PRIVILEGED, "GUILD_MEMBERS"])

const config = require('./config.json')
const commands = require('./commands') //? bot command folder, each command imported in commands/index.js

class Bot {
    constructor(addCommands) {
        this.config = config
        this.client = new Client({ ws: { intents } })
        //! Option for lightweight client if needed
        if (addCommands) {
            this.addAllCommands()
        }
    }
    addAllCommands() {
        for (const c in commands) {
            this[c] = commands[c]
        }
    }
}
try {
    module.exports = Bot
} catch (error) {
    module.exports = null
}
