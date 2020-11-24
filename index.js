//TODO: Can we include all these repetitive includes in one file and include that?
const { Client, Intents, MessageEmbed } = require('discord.js');
const intents = new Intents([
    Intents.NON_PRIVILEGED,
    "GUILD_MEMBERS",
]);
const client = new Client({ ws: { intents } });
const config = require('./config.json');
//TODO ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//? Web/API requests
const axios = require('axios');

//?For local testing, to ensure bot successful comes online
client.once('ready', () => {

    console.log(`${config.botName} - Online`);
});
let botCommand = (m, c, a) => {
    //TODO Move server commands to difference files?, pull out repetitive code? both?
    switch (c) {
        case 'help':
            m.channel.send("Help yourself.");
            break
        case 'server':
            let embedServer = new MessageEmbed()
                .setTitle('**Server Summary**')
                .setColor('#0055ff');
            client.guilds.fetch(m.guild.id)
                //!WILL FAIL TO RETURN PROPER RESULTS IF MEMBER COUNT EXCEEDS ?
                //TODO: Create more robust process to handle higher counts
                .then(guild => {
                    //TODO More robust member search may require multiple fetch's so 'i' is declared here for now
                    let i = 0;
                    guild.members.fetch()
                        .then(
                            members => {
                                let list = [];
                                for (member of members) {
                                    i++
                                    if (member[1]._roles.length < 1) {
                                        let name = `<@${member[1].user.id}>`
                                        let d = new Date(member[1].joinedTimestamp)
                                        list.push(`${name} - *Join Date: ${d.toDateString()}*`)
                                    }
                                }
                                embedServer.addFields(
                                    { name: 'Total Members', value: i },
                                    { name: 'Users without a role', value: list.length ? list : 'None!' }
                                );
                                m.channel.send({ embed: embedServer, split: true })
                            })
                }
                )
            break

        case 'motivate':
            function getMotivationalGif() {
                let helix = axios.create({
                    baseURL: 'https://api.giphy.com/v1/gifs/'
                })
                let query = 'motivation';
                let rating = 'g';
                let limit = 10;
                helix.get(`search?q=${query}&api_key=${config.giphyKey}&rating=${rating}&limit=${limit}`).then(response => {
                    let url = response.data.data[Math.floor(Math.random() * limit)].url;
                    console.log(url);
                    m.channel.send(url);
                });
            }
            getMotivationalGif();

            break
        case 'poll':
            let embedPoll = new MessageEmbed()
                .setColor('#094faf')
                .setTitle('Weekly Study Poll')
                .setFooter('React below with the weekly topic that is giving you the most trouble.')
            const l = require('./topics.json');
            if (a.length === 1 && (a[0].match('^w[1-9]$|^w0[0-9]$|^w1[0-9]$|^w2[0-4]$'))) {
                for (var q in l[a[0]]) {
                    embedPoll.addField(q, l[a[0]][q], true);
                }
                m.channel.send(embedPoll).then(p => {
                    for (let i = 0; i < Object.keys(l[a[0]]).length; i++) {
                        p.react(`${i}\u20E3`);
                    }
                })
            } else {
                m.channel.send('Invalid Argument: Please provide a valid week\n\n*Ex. w1, w2, w19*');
            }
            break
        case 'bounce':
            let daysToKick = 3; //!Number of days to be in server to be eligible for bouncing
            let embedBounce = new MessageEmbed()
                .setTitle('**Auto-Bounce Summary**')
                .setColor('#0055ff')
            client.guilds.fetch(m.guild.id)
                .then(guild => {
                    guild.members.fetch()
                        .then(
                            members => {
                                let list = []
                                let t = new Date()
                                for (member of members) {
                                    if (member[1]._roles.length < 1) {
                                        //difference in days, between today and member join date
                                        let d = Math.floor(((t - new Date(member[1].joinedTimestamp)) / 86400000)) //24(hours) * 60(minutes) * 60(seconds) * 1000(milliseconds)
                                        if (d > daysToKick) {
                                            let name = `<@${member[1].user.id}>`
                                            list.push(`${name} - *Time in server: ${d} days*`)
                                        }
                                    }
                                }
                                if (list.length) {
                                    embedBounce.addFields(
                                        { name: 'Members to kick', value: list },
                                        { name: '*Are you sure you wish to kick these members?*', value: 'Please type ***~confirm*** to continue' }
                                    )
                                } else {
                                    embedBounce.addFields(
                                        { name: 'No members to kick', value: 'All members have been assigned a role!' }
                                    )
                                }
                                m.channel.send({ embed: embedBounce, split: true })
                            }
                        )
                }
                )
            break
        case 'hello':
            m.react(`👋`);
            break
        case 'rainbow':
            console.log(client.guilds)
            //console.log(m.guild)
            break
        case 'test':

            break
        default:
            break
    }
}
client.on('message', m => {
    if (m.content.startsWith(`${config.prefix}`)) {
        const a = m.content.slice(config.prefix.length).trim().split(/ +/g);
        const c = a.shift().toLowerCase();
        botCommand(m, c, a);
    };

});
client.login(config.token);
