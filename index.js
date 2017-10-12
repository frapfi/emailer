const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
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
//which is immediately invoked
//with the app argument
require('./routes/authRoutes')(app);

// possibility to inject runtime variables / configs
// (after deployment just before the app starts)
const PORT = process.env.PORT || 5000;

app.listen(PORT);
