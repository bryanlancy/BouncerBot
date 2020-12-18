const { MessageEmbed } = require('discord.js')
const Bot = require('../config/Bot.js')
class RemBot extends Bot {
	constructor(isLive = false) {
		super(false)
		this.isLive = isLive
	}
	sendReminder = function (type) {
		return new Promise((res, rej) => {
			const { month, day, year, est, pst } = this.getTimestamp()
			console.log(this.getTimestamp())
			let title, message
			switch (type) {
				case 'checkIn':
					title = 'Check In'
					message = "Don't forget to check in! @everyone"
					break
				case 'report':
					title = 'Daily Reprt'
					message = "Don't forget to fill out the daily report! @everyone"
					break
				default:
					break
			}
			//? Create embed instance and set properties
			const embed = new MessageEmbed()
				.setTitle('Link to Progress Tracker')
				.setURL('https://progress.appacademy.io/me')
				.setAuthor(`${title} Reminder`)
				.setFooter(`${month}/${day}/${year}   ${pst}   ${est}`)
				.setColor(0xff0000)
				.setThumbnail(
					'https://pbs.twimg.com/profile_images/378800000699275845/28983bbc0ac0a12cde1c0dc3fc818b4b_400x400.png'
				)
			if (this.isLive) {
				//? Send reminder to all announce channels in config file
				this.config.announcementChannels.forEach(e =>
					client.channels.fetch(e).then(channel => {
						//!Send message and embed separately because mentions dont send notifications when inside embeds
						channel.send("Don't forget to check in! @everyone")
						channel.send(message)
						channel.send(embed)
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
						channel.send(embed)
					})
					.then(res())
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
