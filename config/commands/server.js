const { MessageEmbed } = require("discord.js")

function server(mes, args, bot) {
    let embed = new MessageEmbed()
        .setTitle('**Server Summary**')
        .setColor('#0055ff')
    bot.client.guilds.fetch(mes.guild.id)
        //!WILL FAIL TO RETURN PROPER RESULTS IF MEMBER COUNT EXCEEDS ?*NEED TO FIND AMOUNT*
        //TODO: Create more robust process to handle higher counts
        .then(guild => {
            //TODO: More robust member search may require multiple fetch's so 'i' is declared here for now
            //TODO: If more than ? amount, push to member array and fetch again, when less than ? amount, push then return
            let i = 0
            guild.members.fetch()
                .then(
                    members => {
                        let list = []
                        for (member of members) {
                            i++
                            if (member[1]._roles.length < 1) {
                                let name = `<@${member[1].user.id}>`
                                let d = new Date(member[1].joinedTimestamp)
                                list.push(`${name} - *Join Date: ${d.toDateString()}*`)
                            }
                        }
                        embed.addFields(
                            { name: 'Total Members', value: i },
                            { name: 'Users without a role', value: list.length ? list : 'None!' }
                        )
                        mes.channel.send({ embed: embed, split: true })
                    })
        }
        )
}

try {
    module.exports = server
} catch (error) {
    module.exports = null
}
