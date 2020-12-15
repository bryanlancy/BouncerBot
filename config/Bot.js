const { Client, Intents } = require('discord.js')
const intents = new Intents([Intents.NON_PRIVILEGED, 'GUILD_MEMBERS'])

const config = require('./config.json')
const commands = require('./commands') //? bot command folder, each command imported in commands/index.js

class Bot {
	constructor(addCommands = true) {
		this.config = config
		this.client = new Client({ ws: { intents } })
		//! Option for lightweight client if needed
		if (addCommands) {
			for (const c in commands) {
				if (!this.hasOwnProperty[c]) this[c] = commands[c]
			}
			this.parseCommand = function (message) {
				const args = message.content.slice(this.config.prefix.length).trim().split(/ +/g)
				const command = args.shift().toLowerCase()
				return [command, args]
			}
			this.botCommand = function (message) {
				const [command, args] = this.parseCommand(message)
				if (this.hasOwnProperty(command)) {
					try {
						this[command](message, args, this)
					} catch (e) {
						return new Error(`Failed to execute the ${command} command\n${e}`)
					}
				}
			}
		}
	}
	getTimestamp() {
		const date = new Date()
		console.log(date.toJSON())
		const month = date.getMonth() + 1 //! zero=based value
		const day = date.getDate()
		const year = date.getFullYear()
		const hour = date.getHours()
		const min = date.getMinutes()

		//! Server time is UTC+0
		const est = `${hour - 5}:${min} EST` //? Eastern Time UTC-5, as string
		const pst = `${hour - 8}:${min} PST` //? Pacific Time UTC-8, as string

		return {
			est: est,
			pst: pst,
			month: month,
			day: day,
			year: year,
		}
	}
}
try {
	module.exports = Bot
} catch (error) {
	module.exports = null
}
