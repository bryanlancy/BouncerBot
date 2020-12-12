const bB = new (require('./Bot.js'))(true) //? Bot instantiation
bB.client.once('ready', () => {
    console.log(`${bB.config.botName} - Online`) //?For local testing, to ensure bot successful comes online
})
bB.client.on('message', message => {
    if (message.content.startsWith(`${bB.config.prefix}`)) {
        bB.botCommand(message)
    }
})
bB.client.login(bB.config.token)
