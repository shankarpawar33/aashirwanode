var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var DelevryScheema = new mongoose.Schema({
	delevery_id: {type: String,default:null},
	order_Id: {type: String,default:null},
	plant_Id:{type: Number,default: null},
	customer_id:{type: Number,default: null},
	delevry_Boy_Id: {type: String,default:null},
	paid_amt: {type: String,default:null},
	payable_amt: {type: String,default:null},
	total_Order_Cost:{type: String,default:null},
	remaining_Amt:{type: String,default:null},
	delevry_Location_code: {type:String ,default:null},
	order_Date_place:{type: String,default:null},
	payment_Method:{type: String,default:null},
	product_Qty: {type: String,default:null},
	delevry_Remark: {type: String,default:null},
	delevery_Status: {type: String,default:null},
	delevry_Date: {type: String,default:null},
	empty_Jaar: {type: String,default:null},

	
})
var plant = mongoose.model('Delevry', DelevryScheema);
module.exports=plant;


