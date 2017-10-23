const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String,
	credits: { type: Number, default: 0 }
});

//create a new collection called users
//loads the schema "userSchema" into mongoose (2 arguments)
//creating a model class (mongoose) and loading it into mongoDB as a collection
mongoose.model('users', userSchema);
