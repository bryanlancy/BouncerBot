
//TODO: Can we include all these repetitive includes in one file and include that?
//Client Setup
const { Client, Intents, MessageEmbed } = require('discord.js');
const intents = new Intents([
    Intents.NON_PRIVILEGED,
    "GUILD_MEMBERS",
]);
const client = new Client({ ws: { intents } });
//Import config
const config = require('./config.json');
//TODO ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


//? Define sendReminder Function
function sendReminder() {
    //!Server time is UTC+0
    let date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();

    let estTimestamp = `${date.getHours() - 5}:${min} EST`;//? Eastern Time UTC-5, as string
    let pstTimeStamp = `${hour - 8}:${min} PST`;//? Pacific Time UTC-8, as string

    //? Create embed instance and set properties
    const embed = new MessageEmbed()
        .setTitle('Link to Progress Tracker')
        .setURL('https://progress.appacademy.io/me')
        .setAuthor('AppAcademy Check-In Reminder')
        .setFooter(`${date.getMonth()}/${date.getDate()}/${date.getFullYear()}   ${estTimestamp}   ${pstTimeStamp}`)
        .setColor(0xff0000)
        .setThumbnail('https://pbs.twimg.com/profile_images/378800000699275845/28983bbc0ac0a12cde1c0dc3fc818b4b_400x400.png');

    //? Send reminder to all announce channels in config file
    //!Send message and embed separately because mentions dont send notifications when inside embeds
    config.announcementChannels.forEach(e =>
        client.channels.fetch(e)
            .then(channel => {
                channel.send("Don't forget to check in! @everyone");
                channel.send(embed)
            }))
    //TODO: Delete below when above code is confirmed to work
    //!OLD - DELETE BELOW

}
//? Log new client instance in, then send reminder
client.login(config.token).then(sendReminder);

//!BAD CODE BELOW
//TODO: async? rather than wait for timer to destroy client, should wait for sendReminder to complete then immediately destroy
setTimeout(function () { client.destroy() }, 5000);
