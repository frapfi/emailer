const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

//mongoose model class:
//also possible is to simply require the Survey.js file
//but this procedure prevents the test framework from throwing an error
const Survey = mongoose.model('surveys');

module.exports = app => {
	app.get('/api/surveys', requireLogin, async (req, res) => {
		const surveys = await Survey.find({ _user: req.user.id }).select({
			recipients: false
		});

		res.send(surveys);
	});

	app.get('/api/surveys/:surveyId/:choice', (req, res) => {
		res.send('Thanks for voting');
	});

	/* req.body object example:
	[ {
		ip: '80.134.167.141',
		sg_event_id: 'fAqf2LV_Sx6GCwFyebUZrQ',
		sg_message_id: 'YXYGYnE9RHu1iuBmHKgY1g.filter0019p3iad2-775-5A0866CD-15.0',
		useragent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Safari/604.1.38',
		event: 'click',
		url_offset: { index: 0, type: 'html' },
		email: 'troglodeus@gmail.com',
		timestamp: 1510500057,
		url: 'http://localhost:3000/api/surveys/5a0866cda25df00ff8e2b2c6/yes'
    } ]

	 */

	app.post('/api/surveys/webhooks', (req, res) => {
		//console.log(req.body);

		//define the specific part that we want to extract with wildcarts
		const p = new Path('/api/surveys/:surveyId/:choice');
		//console.log(p);

		_.chain(req.body)
			.map(({ email, url }) => {
				//get whole pathname: '/api/surveys/5a0866cda25df00ff8e2b2c6/yes'
				//console.log(p.test(pathname));
				//returns this object:
				//{ surveyId: '5a0866cda25df00ff8e2b2c6', choice: 'yes' }
				//if the surveyId and / choice could not be extracted the object is null
				const match = p.test(new URL(url).pathname);

				if (match) {
					return {
						email,
						surveyId: match.surveyId,
						choice: match.choice
					};
				}
			})
			//Removes all undefined elements
			.compact()
			//remove elements that are identical, duplicate email or surveyId
			.uniqBy('email', 'surveyId')
			.each(({ surveyId, email, choice }) => {
				Survey.updateOne(
					{
						_id: surveyId,
						recipients: {
							$elemMatch: { email: email, responded: false }
						}
					},
					{
						$inc: { [choice]: 1 },
						$set: { 'recipients.$.responded': true },
						lastResponded: new Date()
					}
				).exec();
			})
			.value();

		//console.log(events);

		res.send({});
	});

	app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
		//pull out all the different values the user has filled out in the form
		const { title, subject, body, recipients } = req.body;

		const survey = new Survey({
			//title: title
			title,
			subject,
			body,
			recipients: recipients
				.split(',')
				.map(email => ({ email: email.trim() })),
			_user: req.user.id,
			dateSent: Date.now()
		});

		//object that contains the subject in an object and the list of recipients
		//2nd argument contains the body/content as a function
		const mailer = new Mailer(survey, surveyTemplate(survey));

		try {
			await mailer.send();
			await survey.save();
			req.user.credits -= 1;
			const user = await req.user.save();

			//send back the updated user model to update the header
			//with the new credit amount
			res.send(user);
		} catch (err) {
			res.status(422).send(err);
		}
	});
};
