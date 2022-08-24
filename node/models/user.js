var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new mongoose.Schema({
	firstName: {type: String,default: null},
	lastName: {type: String,default: null},
	userMob: {type: String,default: null},
	userPassword: {type: String,default: null},
	email: {type: String,default: null},
	floor: {type: String,default: null},
	address:{type: String,default: null},
	city:{type: String,default: null},
	state:{type: String,default: null},
	pin_Code:{type: String,default: null},
	userType: {type: String,default: null},
	family_Members:{type: Number,default: null},
	password: {type: Number,default: null},
	plantId:{type: Number,default: null}, // User will select plant from dropdown while Registering 
	customer_id:{type: Number,default: null}, // User will select plant from dropdown while Registering 
	plntOwnerID:{type: Number,default: null} 
})


UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);
