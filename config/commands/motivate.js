async function getGiphyURL(key) {
    const axios = require('axios') //? Web/API requests
    let helix = axios.create({
        baseURL: 'https://api.giphy.com/v1/gifs/'
    })
    let query = 'motivation'
    let rating = 'g'
    let limit = 10
    return await helix.get(`search?q=${query}&api_key=${key}&rating=${rating}&limit=${limit}`)
        .then(res => {
            const url = res.data.data[Math.floor(Math.random() * limit)].url
            return url
        })
}
async function motivate(mes, args, bot) {
    let url = await getGiphyURL(bot.config.giphyKey)
    mes.channel.send(url)
}

try {
    module.exports = motivate
} catch (error) {
    module.exports = null
}
