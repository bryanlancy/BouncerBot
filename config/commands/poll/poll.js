const { MessageEmbed } = require('discord.js')
const topics = require('./topics.json')

function poll(mes, args) {
    let embed = new MessageEmbed()
        .setColor('#094faf')
        .setTitle('Weekly Study Poll')
        .setFooter('React below with the weekly topic that is giving you the most trouble.')
    let week = args[0]
    if (args.length === 1 && (week.match('^w[1-9]$|^w0[0-9]$|^w1[0-9]$|^w2[0-4]$'))) {
        for (var topic in topics[week]) {
            embed.addField(topic, topics[week][topic], true)
        }
        mes.channel.send(embed).then(p => {
            for (let i = 0; i < Object.keys(topics[week]).length; i++) {
                p.react(`${i}\u20E3`)
            }
        })
    } else {
        mes.channel.send('Invalid Argument: Please provide a valid week\n\n*Ex. w1, w2, w19*')
    }
}

try {
    module.exports = poll
} catch (error) {
    module.exports = null
}
