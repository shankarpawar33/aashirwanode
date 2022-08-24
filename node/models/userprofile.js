var mongoose = require('mongoose');

var UserProfileSchema = new mongoose.Schema({
    UserName: String,
    description: String,
    fileName: String
})
module.exports = mongoose.model('UserProfile', UserProfileSchema);