const { MessageEmbed } = require('discord.js')
const Bot = require('../config/Bot.js')
class RemBot extends Bot {
	constructor(isLive = false) {
		super(false)
		this.isLive = isLive
	}
	sendReminder = async function (type) {
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
			console.log('LIVE REMINDER')
			//? Send reminder to all announce channels in config file
			return await this.config.announcementChannels.forEach(e =>
				client.channels.fetch(e).then(channel => {
					//!Send message and embed separately because mentions dont send notifications when inside embeds
					channel.send(message)
					channel.send(embed)
				})
			)
		} else {
			console.log('TESTING REMINDER')
			return await this.client.channels
				.fetch(this.config.localTestingChannelID)
				.then(channel => {
					console.log(channel)
					channel.send(message)
					channel.send(embed)
				})
				.catch(e => {
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
