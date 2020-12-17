const { Client, Intents } = require('discord.js')
const intents = new Intents([Intents.NON_PRIVILEGED, 'GUILD_MEMBERS'])

const commands = require('./commands') //? bot command folder, each command imported in commands/index.js
class Bot {
	constructor(addCommands) {
		this.config = require('./config.json')
		this.client = new Client({ ws: { intents } })

		//! Option for lightweight client if needed
		if (addCommands) {
			for (const c in commands) {
				if (!this.hasOwnProperty[c]) this[c] = commands[c]
			}
			this._parseCommand = function (message) {
				const args = message.content.slice(this.config.prefix.length).trim().split(/ +/g)
				const command = args.shift().toLowerCase()
				return [command, args]
			}
			this.botCommand = function (message) {
				const [command, args] = this._parseCommand(message)
				if (this.hasOwnProperty(command)) {
					try {
						this[command](message, args, this)
					} catch (e) {
						return new Error(`Failed to execute the ${command} command.\n${e}`)
					}
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
