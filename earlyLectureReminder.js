//Client Setup
const { Client, Intents, MessageEmbed } = require('discord.js');
const intents = new Intents([
    Intents.NON_PRIVILEGED,
    "GUILD_MEMBERS",
]);
const client = new Client({ ws: { intents } });
//Import config
const config = require('./config.json');

function sendReminder() {
    //Server time is UTC+0
    let date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();
    //Eastern Time UTC-5
    let estTimestamp = `${date.getHours() - 5}:${min} EST`;
    //Pacific Time UTC-8
    let pstTimeStamp = `${hour - 8}:${min} PST`;

    const embed = new MessageEmbed()
        .setTitle('Link to Zoom Meeting')
        .setURL('https://us02web.zoom.us/j/89398737399?pwd=REUyZkFPdG40c0xaSGI0TEtpNDJRdz09')
        .setAuthor('Early Morning Lecture Reminder')
        .setFooter(`${date.getMonth()}/${date.getDate()}/${date.getFullYear()}   ${estTimestamp}   ${pstTimeStamp}`)
        .setColor(0xff0000)
        .setThumbnail('https://pbs.twimg.com/profile_images/378800000699275845/28983bbc0ac0a12cde1c0dc3fc818b4b_400x400.png');

    client.channels.fetch(config.announceChannelID)
        .then(channel => { channel.send("Good morning! It's Wednesday, Jesse will be live for extra class time at 7:30am PST @everyone"); channel.send(embed) });
}

client.login(config.token).then(sendReminder);
setTimeout(function () { client.destroy() }, 5000);
