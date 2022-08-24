var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	userMob: {
		type: Number,
		index: true,
		unique: true
	},
	userPassword: String,
	email: {
		type: String,
		index: true,
		unique: true
	},
	floor: String,
	flatNo: String,
	wingName: String
})



UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);
// newToken: String,
// userConfirmPassword: String,
// notificationTime: String,
// userName: String,
// messageId: String,