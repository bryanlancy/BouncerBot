function hello(mes) {
    mes.react(`👋`)
}

try {
    module.exports = hello
} catch (error) {
    module.exports = null
}
