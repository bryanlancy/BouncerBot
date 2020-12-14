const { MessageEmbed } = require('discord.js')

function bounce(mes, args, bot) {
	let daysToKick = 3 //!Number of days to be in server to be eligible for bouncing
	let embed = new MessageEmbed()
		.setTitle('**Auto-Bounce Summary**')
		.setColor('#0055ff')

	bot.client.guilds
		.fetch(mes.guild.id)
		.then((guild) => guild.members.fetch())
		.then((members) => {
			let list = []
			let now = new Date()
			for (mem of members) {
				if (mem[1]._roles.length < 1) {
					//difference in days, between today and member join date
					let daysInServer = Math.floor(
						(now - new Date(mem[1].joinedTimestamp)) / 86400000
					) //?24(hours) * 60(minutes) * 60(seconds) * 1000(milliseconds)
					if (daysInServer > daysToKick) {
						let name = `<@${mem[1].user.id}>`
						list.push(
							`${name} - *Time in server: ${daysInServer} days*`
						)
					}
				}
			}
			if (list.length) {
				embed.addFields(
					{ name: 'Members to kick', value: list },
					{
						name: '*Are you sure you wish to kick these members?*',
						value: 'Please type ***~confirm*** to continue',
					}
				)
			} else {
				embed.addFields({
					name: 'No members to kick',
					value: 'All members have been assigned a role!',
				})
			}
			mes.channel.send({ embed: embed, split: true })
		})
}

try {
	module.exports = bounce
} catch (error) {
	module.exports = null
}
