const bB = new (require('./Bot.js'))(true) //? Bot instantiation
bB.client.once('ready', () => {
    console.log(`${bB.config.botName} - Online`); //?For local testing, to ensure bot successful comes online
})
bB.client.on('message', message => {
    if (message.content.startsWith(`${bB.config.prefix}`)) {
        const [command, args] = bB.parseCommand(message)
        bB.botCommand(message, args, command)
    }
})
bB.client.login(bB.config.token)
