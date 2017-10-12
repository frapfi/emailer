const passport = require('passport');

module.exports = app => {

	//incoming request route for authentication
	//use passport with google strategy
	app.get(
		'/auth/google',
		//google identifier
		passport.authenticate('google', {
			//what access we would have for the profile from google
			scope: ['profile', 'email']
		})
	);

	//passport adds several helper function to the req object to
	//manipulate the authentication status
	app.get('/api/logout', (req, res) => {
		//kills the cookie so it has no reference to the current user
		req.logOut();
		res.send(req.user);
	});

	//callback with the google authentication code
	app.get('/auth/google/callback', passport.authenticate('google'));

	//after the authentication is done,
	//the user model instance that we return from "passport.deserializeUser"
	//is added to the request object as req.user
	//in other words: if if user model exists on req.user,
	//it means that authentication must be working inside our app
	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
};
