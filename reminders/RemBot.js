const Bot = require('../config/Bot.js')
class RemBot extends Bot {
	constructor(isLive = false) {
		super(false)
		this.isLive = isLive
	}
	sendReminder = function (message) {
		return new Promise((res, rej) => {
			if (this.isLive) {
				//? Send reminder to all announce channels in config file
				this.config.announcementChannels.forEach(e =>
					client.channels.fetch(e).then(channel => {
						//!Send message and embed separately because mentions dont send notifications when inside embeds
						channel.send("Don't forget to check in! @everyone")
						channel.send(message)
					})
				)
			} else {
				console.log('TESTING REMINDER')
				this.client.channels
					.fetch(this.config.localTestingChannelID)
					.then(channel => {
						if (!channel) throw new Error(`Channel not found:\n\t${channel}`)
						console.log('SENDING')
						channel.send(message)
						res()
					})
					.catch(e => {
						console.log(e)
					})
			}
		})
	}
}

try {
	module.exports = RemBot
} catch (error) {
	module.exports = null
}
