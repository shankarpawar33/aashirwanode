var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var SalesScheema = new mongoose.Schema({
	plantId:{type: Number,default: null},
	OrderId: {type: String,default:null},
	date: {type: String,default:null},
	// plantAddress: {type: String,default:null},
	// plntOwnerID:{type: Number,default: null}
})


// module.exports = mongoose.model('Plant', PlantScheema);
// module.exports=addproducts;
var plant = mongoose.model('Sales', SalesScheema);
module.exports=plant;
