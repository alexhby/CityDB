var mongoose = require('mongoose');
 
module.exports = mongoose.model('User',{
	id: String,
	username: String,
	password: String,
	email: String,
	firstName: String,
	lastName: String,
	fb: {
		id: String,
		access_token: String,
		//firstName: String,
		//lastName: String,
		//email: String
	}
});