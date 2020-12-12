const bB = new (require('./botSetup.js'))(true) //? Bot instantiation
bB.client.once('ready', () => {
    console.log(`${bB.config.botName} - Online`); //?For local testing, to ensure bot successful comes online
})
let botCommand = (mes, com, args) => {
    //TODO Move server commands to difference files?, pull out repetitive code? both?
    switch (com) {
        case 'help':
            bB.help(mes, args)
            break
        case 'server':
            bB.server(bB, mes)
            break
        case 'motivate':
            bB.motivate(bB, mes)
            break
        case 'poll':
            bB.poll(mes, args)
            break
        case 'bounce':
            bB.bounce(bB, mes, args)
            break
        case 'hello':
            bB.hello(mes)
            break
        case 'rainbow':
            bB.rainbow(bB)
            break
        case 'test':

            break
        default:
            break
    }
}
bB.client.on('message', message => {
    if (message.content.startsWith(`${bB.config.prefix}`)) {
        const args = message.content.slice(bB.config.prefix.length).trim().split(/ +/g)
        const command = args.shift().toLowerCase()
        botCommand(message, command, args)
    }

})
bB.client.login(bB.config.token)
