var mongoose = require('mongoose');

var AdminSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String,
    userMob: Number,
    userPassword: String,
    newToken: String,
    userConfirmPassword: String,
    notificationTime: String,
    messageId: String,
    email: String,

})
module.exports = mongoose.model('Admin', AdminSchema);