function help(message, args) {
    console.log('HELP TESTING')
    message.channel.send("Help yourself.");
}

try {
    module.exports = help
} catch (error) {
    module.exports = null
}
