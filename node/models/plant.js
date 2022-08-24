var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var PlantScheema = new mongoose.Schema({
	plantName: {type: String,default:null},
	plantEmail: {type: String,default:null},
	plantAddress: {type: String,default:null},
	numberOfOwners: {type: String,default:null},
	mappedUserId: {type: String,default:null},
	deleveryPersons:{type: String,default:null},// DeleveryBoy
	numberOfCustomers:{type: Number,default: 200},
	dailySales:{type: Number,default: 250},	
	dailyExpence:{type: Number,default: null},
	plantId:{type: Number,default: null},
})


// module.exports = mongoose.model('Plant', PlantScheema);
// module.exports=addproducts;
var plant = mongoose.model('Plant', PlantScheema);
module.exports=plant;
