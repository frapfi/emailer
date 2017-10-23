const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

//just execute stuff / run its js code from those files
//order matters: 1st load up the modeling stuff than the persisting stuff
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

//a single express instance / application
const app = express();

/* middleware section => pre-processing the incoming request before
   send to the corresponding
 * route handlers */

app.use(bodyParser.json());

//tell express to use cookies
app.use(
	cookieSession({
		//30 days
		maxAge: 30 * 24 * 60 * 60 * 1000,
		//encryption key
		keys: [keys.cookieKey]
	})
);
//tell passport to handle cookies
app.use(passport.initialize());
app.use(passport.session());

//alternative
//require returns a function that takes a app object
//which is immediately invoked with the app argument
//in other words: this require statement turns into a function which will be called
//with the express app object
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
//result: all routes are separated in a different file
//app.get('/api/logout', (req, res) ...
//app.get('/api/current_user') ...

if (process.env.NODE_ENV === 'production') {
	//Express will FIRST check to see if there is a file
	//that matches up with the request in the defined directory
	//Express will serve up production assets like
	//our main.js or main.css file
	//if any get request comes in for some route or file and
	//we do not understand what it is looking for (when there is no express route handler defined)
	//then  look into this client/build directory and see if there is some file in it
	//that matches up with the file that is requested for
	app.use(express.static('client/build'));

	//Express will serve up the index.html file
	//if it doesn't recognize the route
	//if no other defined routes exist this is the "catch all" "*" route
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

// possibility to inject runtime variables / configs
// (after deployment just before the app starts)
const PORT = process.env.PORT || 5000;

app.listen(PORT);
