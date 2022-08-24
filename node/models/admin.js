var mongoose = require('mongoose');

var AdminSchema = new mongoose.Schema({
    adminName: String,
    // lastName: String,
    // userName: String,
    // userMob: Number,
    adminPassword: String,
    // newToken: String,
    // userConfirmPassword: String,
    // notificationTime: String,
    // messageId: String,
    // email: String,

})
module.exports = mongoose.model('Admin', AdminSchema);