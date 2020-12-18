const bBReminder = new (require('./RemBot.js'))() //! Bot instantiation, true if LIVE

bBReminder.client
	.login(bBReminder.config.token)
	.then(bBReminder.sendReminder('checkIn'))
	.then(x => {
		console.log('DESTROYING')
		console.log('res:', x)
		bBReminder.client.destroy()
	})
