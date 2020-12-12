function help(mes, args) {
    console.log('HELP TESTING')
    mes.channel.send("Help yourself.")
}

try {
    module.exports = help
} catch (error) {
    module.exports = null
}
