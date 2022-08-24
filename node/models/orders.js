var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var OrderScheema = new mongoose.Schema({
	full_Name:{type: String,default:null},
	delevry_Address:{type: String,default:null},
	customer_id: {type: String,default:null},
	order_id: {type: String,default:null},
	order_Status_Code: {type: String,default:null},
	payment_Method: {type: String,default:null},
	order_Date_place: {type:String ,default:null},
	order_Date_paid:{type: String,default: null},
	product_Id:{type: String,default: null},	
	product_Qty:{type: Number,default: null},
	total_Order_Cost:{type: String,default:null},
	plantId:{type: String,default: null},
	
	// plntOwnerID:{type: Number,default: null}
})


// module.exports = mongoose.model('Plant', PlantScheema);
// module.exports=addproducts;
var plant = mongoose.model('Orders', OrderScheema);
module.exports=plant;
