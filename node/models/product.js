var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var ProductScheema = new mongoose.Schema({
	product_Id: {type: String,default:null},
	plant_Id: {type: String,default:null},
	product_Name: {type: String,default:null},
	product_Brand_Name: {type:String ,default:null},
	product_Size_Ltr: {type: String,default:null},
	product_Unit_Price: {type: String,default:null},
	product_Qty:{type: Number,default: null}	
	// plntOwnerID:{type: Number,default: null}
})


// module.exports = mongoose.model('Plant', PlantScheema);
// module.exports=addproducts;
var plant = mongoose.model('Products', ProductScheema);
module.exports=plant;
