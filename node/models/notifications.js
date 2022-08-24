var mongoose = require('mongoose');

var NotificationsSchema = new mongoose.Schema({
    newTokens: [],
    notificationTime: String,
    notificationDate: String,
    messageId: String,
    notificationTitle: String,
    notificationBody: String,
    notificationTopic: String
})
module.exports = mongoose.model('Notifications', NotificationsSchema);