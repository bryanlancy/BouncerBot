const { MessageEmbed } = require('discord.js')
const bBReminder = new (require('./RemBot.js'))(false) //! Bot instantiation, true if LIVE

const date = new Date()
const month = date.getMonth()
const day = date.getDate()
const year = date.getFullYear()
const hour = date.getHours()
const min = date.getMinutes()
//!Server time is UTC+0
const estTimestamp = `${hour - 5}:${min} EST` //? Eastern Time UTC-5, as string
const pstTimeStamp = `${hour - 8}:${min} PST` //? Pacific Time UTC-8, as string
//? Create embed instance and set properties
const embed = new MessageEmbed()
	.setTitle('Link to Progress Tracker')
	.setURL('https://progress.appacademy.io/me')
	.setAuthor('AppAcademy Check-In Reminder')
	.setFooter(`${month}/${day}/${year}   ${estTimestamp}   ${pstTimeStamp}`)
	.setColor(0xff0000)
	.setThumbnail(
		'https://pbs.twimg.com/profile_images/378800000699275845/28983bbc0ac0a12cde1c0dc3fc818b4b_400x400.png'
	)

bBReminder.client
	.login(bBReminder.config.token)
	.then(bBReminder.sendMessage(embed))
	.then(() => bBReminder.client.destroy())
