var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var OwnersScheema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    plantName: String,
    phone: {
        type: Number,
        index: true,
        unique: false
    },
    id: String,
    password: String,
    email: {
        type: String,
        index: true,
        unique: true
    },
    address:String

})



OwnersScheema.plugin(uniqueValidator);

module.exports = mongoose.model('Owners', OwnersScheema);