const Bot = require('../config/Bot.js')
class RemBot extends Bot {
	constructor(isLive = false) {
		super(false)
		this.isLive = isLive
	}
	sendMessage = async function (message) {
		if (this.isLive) {
			console.log('LIVE REMINDER')
			//? Send reminder to all announce channels in config file
			return await this.config.announcementChannels.forEach((e) =>
				client.channels.fetch(e).then((channel) => {
					//!Send message and embed separately because mentions dont send notifications when inside embeds
					channel.send("Don't forget to check in! @everyone")
					channel.send(message)
				})
			)
		} else {
			console.log('TESTING REMINDER')
			console.log(this.client.channels)
			return await this.client.channels
				.fetch(this.config.localTestingChannelID)
				.then((channel) => {
					console.log(channel)
					channel.send(message)
				})
				.catch((e) => {
					console.log(e)
				})
		}
	}
}

try {
	module.exports = RemBot
} catch (error) {
	module.exports = null
}
