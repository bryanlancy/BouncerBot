const bBReminder = new (require('./RemBot.js'))() //! Bot instantiation, true if LIVE

bBReminder.client
	.login(bBReminder.config.token)
	.then(bBReminder.sendReminder('report'))
	.then(() => bBReminder.client.destroy())
