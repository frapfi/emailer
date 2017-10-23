const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
//own middleware for only intercepting the route '/api/stripe'
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
	app.post('/api/stripe', requireLogin, async (req, res) => {
		//console.log(req.body);
		//create the actual charge on stripe and bill the credit card
		//for further information cf. "Example Request" on
		//https://www.npmjs.com/package/stripe
		//https://stripe.com/docs/api/node#balance_history
		const charge = await stripe.charges.create({
			amount: 500,
			currency: 'usd',
			description: '$5 for 5 credits',
			source: req.body.id
		});

		//console.log(charge);

		//whenever we make use of passport and the user has signed into our application
		//we can access the current user model as: "req.user". This is set up automatically by passport:
		//when we initialized it as middleware in index.js
		req.user.credits += 5;
		const user = await req.user.save();

		//send back the user to the frontend / browser
		res.send(user);
	});
};
