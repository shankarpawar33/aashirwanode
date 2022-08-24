var mongoose = require('mongoose');

var ImgSchema = new mongoose.Schema({
    label: String,
    description:String,
    fileName: String
})
module.exports = mongoose.model('Pic', ImgSchema);
