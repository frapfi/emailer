const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

//cf. User.js, when only giving a single argument we can pull out (fetch) a schema
//"User" is the model class
//with a model class we can create a new model instance and thus a record in mongoDB
const User = mongoose.model('users');

//take the model instance and make an identifier // cookie out of it
//stuff the user.id into the cookie
passport.serializeUser((user, done) => {
	// user.id => is NOT the profileId
	// it is the automatic generated id by mongDB!
	done(null, user.id);
});
//fetch the id out of the cookie
//and turn it into a model instance (to search for it in the DB)
passport.deserializeUser((id, done) => {
	//"then(user) .. whatever we have pulled out of the DB"
	User.findById(id).then(user => {
		//call done with tha user
		done(null, user);
	});
});

//GoogleStrategy has an internal identifier called 'google':
//  when anyone attempts to authenticate with the
// string 'google', create this new Instance
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback'
		},
		// when user comes back to our website / is authenticated
		// this callback runs
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ googleId: profile.id }).then(existingUser => {
				if (existingUser) {
					//we already have a record with the given profile ID
					//null: error
					done(null, existingUser);
				} else {
					// we don't havae a suer record with this ID,
					// create a new model instance // make a new record
					new User({ googleId: profile.id })
						//and save that instance
						.save()
						//when saved (async), we get back another instance in the callback
						//we use this updated / clean instance
						.then(user => done(null, user));
				}
			});
		}
	)
);
