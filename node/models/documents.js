var mongoose = require('mongoose');

var DocSchema = new mongoose.Schema({
    userId: String,
    description: String,
    fileName: String
})
module.exports = mongoose.model('Doc', DocSchema);