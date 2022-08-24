var express = require('express');
var app = express();

var User = require('../models/user');

var Pic = require('../models/images');
var Doc = require('../models/documents');
var Notifications = require('../models/notifications');
var Owners = require('../models/owners')
var Admin = require('../models/admin')
var UserProfile = require('../models/userprofile');
var Plant = require('../models/plant');
var Product = require('../models/product')
var Orders = require('../models/orders')
var Delevery = require('../models/delevery')
var bcrypt = require('bcrypt-nodejs');
var serverKey = 'AAAAJ3qD5jQ:APA91bH19g0GV-LVWhWt97hW8V970VCDvfhfKPyBBiksE62I8l1aHNwyvz48Wl4F_26XEz0EWBZ0uJkfWrupkOZF5ZLo1Hd0cw6r-2TD874zPmP0uV6gw-Gq4oRArRUdZ7kxG0iKrz_G';
var FCM = require('fcm-push');
var fcm = new FCM(serverKey);
var admin = require('firebase-admin');
// var admin = require("firebase-admin");


app.use('/public', express.static("./IMGDATA"));
app.use('/public', express.static("./Profiles"));
var mongoose = require('mongoose');

var fileName1;
var newName;
// var serviceAccount = require("../routes/delightapp-1-firebase-adminsdk-ldn67-25aea4579d.json");

// async function getDB() {
// 	var url = "mongodb://localhost:27017/aquawater";
// 	await mongoose.connect('mongodb://localhost:27017/aquawater', {
// 		useNewUrlParser: true
// 	}, function (err, db) {
// 		db.collection('orders').aggregate([{
// 			$lookup: {
// 				from: "users",
// 				localField: "plantId",
// 				foreignField: "plantId",
// 				as: "data"
// 			},

// 		}]).toArray(function (err, res) {
// 			console.log(JSON.stringify(res));
// 			db.close();
// 		});
// 	})
// }

// admin.initializeApp({
// 	credential: admin.credential.cert(serviceAccount),
// 	databaseURL: "https://delightapp-1.firebaseio.com"
// });


exports.admindashboarduser = function (req, res) {
	console.log("Registeringgggggg..")
	console.log(req.body + "f")
	var user = User();
	user.firstName = req.body.firstName;
	user.lastName = req.body.lastName;
	user.userMob = req.body.userMob;
	user.email = req.body.email;
	user.floor = req.body.floor;
	user.flatNo = req.body.flatNo;
	user.wingName = req.body.wingName;
	user.userPassword = bcrypt.hashSync(req.body.userPassword);

	user.save(function (err) {
		if (err) {
			res.json({
				success: false,
				message: err + "4"
			});
		} else {
			res.json({
				success: true,
				message: "Successfully saved"
			});
			console.log(user.userMob = req.body.userMob)
		}
	})
}

exports.registerowner = function (req, res) {
	console.log("Regostering Owner")
	owners = Owner();
	owner.password = bcrypt.hashSync(req.body.password);
	owner.save(function (err) {
		if (err) {
			res.json({
				success: false,
				message: err + "4"
			});
		} else {
			res.json({
				success: true,
				message: "Successfully saved"
			});
		}
	})
}



exports.login = function (req, res) {
	console.log(req.body.Data.userMob);
	var user = User();
	User.findOne({
		userMob: req.body.Data.userMob
	}, function (err, user) {
		if (err) {
			res.json({
				success: true,
				message: "invalid usename"
			});
		} else if (!user) {
			res.json({
				success: true,
				message: 'Authentication failed. User not found. 123'
			});
		} else {
			console.log(req.body.Data.password === user.password)
			if (req.body.Data.password === user.password) {
				res.json({
					success: true,
					message: "Successfully login",
					user: user
				});
			} else {
				res.json({
					success: true,
					message: "wrong password",

				});
			}
		}
	})

}

exports.register = function (req, res) {
	console.log("Registeringgggggg..")
	console.log(JSON.stringify(req.body))
	var user = User();
	console.log(req.body);
	user.firstName = req.body.firstName;
	user.lastName = req.body.lastName;
	user.userMob = req.body.userMob;
	user.email = req.body.email;
	user.floor = req.body.floor; //not in used for now
	user.address = req.body.address; //this field will be used for residensial address
	user.city=req.body.city;
	user.state=req.body.state;
	user.pin_Code=req.body.pin_Code
	user.userType = req.body.userType
	user.password = req.body.password
	user.customer_id=req.body.customer_id
	// var plantId = 
	// console.log(this.plantId);
	user.plantId =req.body.plantId
	if (req.body.userType === 'Customer') {
		user.plantId = 525622

	}
	user.save(function (err, data) {
		if (err) {
			res.json({
				success: false,
				message: err + "4"
			});
		} else {
			res.json({
				success: true,
				message: "Successfully saved",
				user:data
			});
			console.log(user.userMob = req.body.userMob)
		}
	})
}

exports.registerPlant = function (req, res) {
	console.log("Registeringgggggg.. Plant")
	var plant = Plant();
	console.log(req.body);
	plant.plantName = req.body.plantName
	plant.plantEmail = req.body.plantEmail
	plant.plantAddress = req.body.plantAddress
	plant.numberOfOwners = req.body.numberOfOwners
	plant.mappedUserId = req.body.mappedUserId // Plant Owner
	plant.deleveryPersons = req.body.deleveryPersons // DeleveryBoy
	plant.numberOfCustomers = req.body.numberOfCustomers,
	plant.dailySales = req.body.dailySales
	plant.dailyExpence = req.body.dailyExpence
	plant.plantId = req.body.plantId
	plant.save(function (err, data) {
		if (err) {
			res.json({
				success: false,
				message: err + "4"
			});
		} else {
			res.json({
				success: true,
				message: "Successfully saved",
				data:data
			});
		}
	})
}

exports.createProduct = function (req, res) {
	console.log("Product Createtion in" + req.body.product_Id)
	var product = Product();
	product.product_Id = req.body.product_Id
	product.plant_Id = req.body.plant_Id
	product.product_Name = req.body.product_Name
	product.product_Brand_Name = req.body.product_Brand_Name
	product.product_Size_Ltr = req.body.product_Size_Ltr
	product.product_Unit_Price = req.body.product_Unit_Price
	product.product_Qty = req.body.product_Qty
	console.log(product)
	product.save(function (err) {
		if (err) {
			res.json({
				success: false,
				message: err + "4"
			});
		} else {
			res.json({
				success: true,
				message: "Product Saved Successfully",
			});
		}
	})
}


exports.deleverd = function (req, res) {
	console.log("Product Createtion in" + JSON.stringify(req.body))
	var deleverd = Delevery();
	// in future		deleverd.remaining_Amt=req.body.remaining_Amt, Should be a Payable ammount inside create order
	// we need write logic inside create order

	deleverd.order_Id = req.body.order_Id,
		deleverd.plant_Id = req.body.plant_Id,
		deleverd.customer_id = req.body.customer_id,
		deleverd.delevry_Boy_Id = req.body.delevry_Boy_Id,
		deleverd.paid_amt = req.body.paid_amt,
		deleverd.payable_amt = req.body.payable_Amt,
		deleverd.total_Order_Cost = req.body.total_Order_Cost,
		deleverd.remaining_Amt = req.body.remaining_Amt,
		deleverd.delevry_Location_code = req.body.delevry_Location_code,
		deleverd.order_Date_place = req.body.order_Date_place,
		deleverd.payment_Method = req.body.payment_Method,
		deleverd.product_Qty = req.body.product_Qty,
		deleverd.delevry_Remark = req.body.delevry_Remark,
		deleverd.delevery_Status = req.body.delevery_Status,
		deleverd.delevry_Date = req.body.delevry_Date,
		deleverd.empty_Jaar = req.body.empty_Jaar,
		deleverd.paid_amt = req.body.paid_amt
	deleverd.delevery_id = Math.floor(100000 + Math.random() * 900000)
	deleverd.save(function (err) {
		if (err) {
			res.json({
				success: false,
				message: err + "4"
			});
		} else {
			res.json({
				success: true,
				message: "Product Saved Successfully",
			});
		}
	})
}


exports.createOrder = async function (req, res) {
	const d_t = new Date();
	let year = d_t.getFullYear();
	let month = ("0" + (d_t.getMonth() + 1)).slice(-2);
	let day = ("0" + d_t.getDate()).slice(-2);
	let hour = d_t.getHours();
	let minute = d_t.getMinutes();
	let seconds = d_t.getSeconds();

	let date = day + "-" + month + "-" + year + " " + hour + ":" + minute + ":" + seconds
	// prints date & time in YYYY-MM-DD HH:MM:SS format
	console.log(year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + seconds);
	console.log("Product Createtion in" + req.body.product_Id)
	var total_cost
	await Product.findOne({
		product_Id: req.body.product_Id
	}, function (err, post) {
		console.log(req.body.product_Id)
		console.log(post)
		total_cost = post.product_Unit_Price * req.body.product_Qty
		console.log(total_cost)
	})
	console.log(total_cost)
	var order = Orders();
	order.full_Name = req.body.full_Name
	order.delevry_Address = req.body.delevry_Address
	order.customer_id = req.body.customer_id
	order.payment_Method = req.body.payment_Method
	order.product_Id = req.body.product_Id
	order.product_Qty = req.body.product_Qty
	order.plantId = req.body.plantId
	order.order_Date_place = date
	if (req.body.payment_Method === 'COD')
		order.order_Date_paid = date
	order.order_Status_Code = 1
	order.order_id = Math.floor(100000 + Math.random() * 900000)
	order.total_Order_Cost = total_cost;
	console.log(total_cost)
	order.save(function (err, data) {
		if (err) {
			res.json({
				success: false,
				message: err + "4"
			});
		} else {
			res.json({
				success: true,
				message: "Order Saved Successfully",
				data: data

			});
		}
	})
}


exports.getOrdersByID = function (req, res) {
	var order = Orders();
	console.log(req.body)
	Orders.find({
		order_id: req.body.order_id
	}, {
		plantId: req.body.plantId
	}, function (err, post) {
		if (err) {
			console.log(err)
		}
		return res.json({
			orders: post
		});
	}).sort({
		$natural: 1
	})
}

exports.getAllOrders = async function (req, res) {
	var orders = Orders();
	Orders.find({
		plantId: req.body.plantId
	}, function (err, post) {
		console.log(post)
		if (err) {
			res.json({
				success: false,
				message: "Db error"
			});

		} else
			res.json({
				Orders: post
			})
	}).sort({
		$natural: -1
	})
}


exports.removeuser = function (req, res) {
	var user = User();
	var id = req.body.id;
	user.deleteOne({
			_id: id
		},
		function (err) {
			if (err) {
				res.json({
					success: false,
					message: "db err"
				});
			} else {
				res.json({
					success: true,
					message: "Successfully dleted"
				});
			}
		})
}


exports.addnewtoken = function (req, res) {
	var user = User();
	user.newToken = req.body.newToken;
	user.save(function (err) {
		if (err) {
			res.json({
				success: false,
				message: "db err"
			});
		} else {
			res.json({
				success: true,
				message: "Successfully saved"
			});
		}
	})
}

exports.adminlogin = function (req, res) {
	console.log(req.body.userName, req.body.userPassword);
	var user = User();
	User.findOne({
		userName: req.body.userName
	}, function (err, user) {
		if (err) {
			res.json({
				success: true, //fales
				message: "invalid usename"
			});
		} else if (!user) {
			res.json({
				success: true, //fales
				message: 'Authentication failed. User not found.'
			});
		} else {
			if (bcrypt.compareSync(req.body.userPassword, user.userPassword)) {
				res.json({
					success: true,
					message: "Successfully login"
				});
			} else {
				res.json({
					success: true, //fales
					message: "wrong password"
				});
			}
		}
	})
}



exports.login2 = function (req, res) {
	console.log(req.body.userName, req.body.userPassword);
	var user = User();
	User.findOne({
		userName: req.body.userName
	}, function (err, user) {
		if (err) {
			res.json({
				success: true,
				message: "invalid usename"
			});
		} else if (!user) {
			res.json({
				success: true,
				message: 'Authentication failed. User not found. 123'
			});
		} else {

			if (bcrypt.compareSync(req.body.userPassword, user.userPassword)) {
				res.json({
					success: true,
					message: "Successfully login",
					user: user
				});
			} else {
				res.json({
					success: true,
					message: "wrong password",

				});
			}
		}
	})

}
// exports.login = function (req, res) {
// 	console.log(req.body.userName, req.body.userPassword);
// 	var user = User();
// 	User.findOne({
// 		userName: req.body.userName
// 	}, function (err, user) {
// 		if (err) {
// 			res.json({
// 				success: false,
// 				message: "invalid usename"
// 			});
// 		} else if (!user) {
// 			res.json({
// 				success: false,
// 				message: 'Authentication failed. User not found.'
// 			});
// 		} else {

// 			if (bcrypt.compareSync(req.body.userPassword, user.userPassword)) {
// 				res.json({
// 					success: true,
// 					message: "Successfully login",
// 					user: {
// 						"firstName": user.firstName,
// 						"lastName": user.lastName,
// 						"userMob": user.userMob,
// 						"email": user.email,
// 						"floor": user.floor,
// 						"flatNo": user.flatNo,
// 						"wingName": user.wingName
// 					}
// 				});
// 			} else {
// 				res.json({
// 					success: false,
// 					message: "wrong password",

// 				});
// 			}
// 		}
// 	})

// }




exports.getPlantDetails = function (req, res) {
	console.log("called")
	var plant = Plant();
	Plant.find({}, function (err, post) {
		if (err) {
			res.json({
				success: false,
				message: "Db error"
			});

		} else
			res.json({
				plants: post
			})
	})
}

exports.getAllUsers = function (req, res) {
	var user = User();
	User.find({}, function (err, post) {
		console.log(post)
		if (err) {
			res.json({
				success: false,
				message: "Db error"
			});

		} else
			res.json({
				Users: post
			})
	})

}
exports.getUserDetails = function (req, res) {
	var user = User();
	console.log(req.body.phone)
	User.findOne({
		userMob: req.body.phone
	}, function (err, post) {
		return res.json({
			users: post
		});
	})

}

exports.Orders = function (req, res) {
	console.log("Registeringgggggg.. Plant")
	// console.log(req.body + "f")
	var plant = Plant();
	// Plant=req.body;
	console.log(req.body);
	plant.plantName = req.body.plantName
	plant.plantEmail = req.body.plantEmail
	plant.plantAddress = req.body.plantAddress
	plant.numberOfOwners = req.body.numberOfOwners
	plant.mappedUserId = req.body.numberOfOwners // Plant Owner
	plant.deleveryPersons = req.body.deleveryPersons // DeleveryBoy
	plant.numberOfCustomers = req.body.numberOfCustomers,
		plant.dailySales = req.body.dailySales
	plant.dailyExpence = req.body.dailyExpence
	var plantId = Math.floor(100000 + Math.random() * 900000)
	console.log(this.plantId);
	plant.plantId = plantId

	// user.userPassword = bcrypt.hashSync(req.body.password);
	plant.save(function (err) {
		if (err) {
			res.json({
				success: false,
				message: err + "4"
			});
		} else {
			res.json({
				success: true,
				message: "Successfully saved"
			});
			// console.log(user.userMob = req.body.userMob)
		}
	})
}




// exports.getPlantDetails = function (req, res) {
// 	var user = User();
// 	console.log(req.body.phone)
// 	User.findOne({
// 		userMob: req.body.phone
// 	}, function (err, post) {

// 		return res.json({
// 			users: post
// 		});
// 	})

// }

// {'title':building A','description':'Brickwork is complete. Plastering is being done, expected to be complete in next 3 days.','images':['https://via.placeholder.com/140x100','https://via.placeholder.com/140x100']}



// exports.getPlantDetails = function (req, res) {
// 	var plant = Plant();

// 	var userId = req.body.userId;
// 	console.log(userId)
// 	plant.find({}, function (err, post) {
// 		return res.json({
// 			users: post
// 		});


// 	})
// }








exports.getnotificatintisdetails = function (req, res) {
	var id = req.body.token
	var user = User();
	Notifications.findOne({
		newToken: id
	}, function (err, post) {

		return res.json({
			users: post
		});
	})
}

exports.notification = function (req, res) {
	var message = {
		to: 'cBUYIxlGOlE:APA91bE4ArDmAcMZ1KT2H66OQ5nggUsBLfaD3q_9uMWLqQYfn0Yb9aWakxfgnc1KnQw6R-jAQqQmdR8IzyLfjRGj8mU2Bpi9K4HtEU_RMYnR_Kvt-0QoPIjbfR67ePoaOKxH3dHHcKog', // required fill with device token or topics
		notification: {
			title: 'notification',
			body: 'message'
		}
	};
	fcm.send(message)
		.then(function (response) {
			console.log("Successfully sent with response: ", response);
		})
		.catch(function (err) {
			console.log("Something has gone wrong!" + JSON.stringify(err));
			console.error(err);
		})
}


exports.notificationtopic = function (req, res) {
	var notifications = Notifications();
	var title = req.body.title;
	var body = req.body.body;
	var topic = req.body.topic;
	var tokens = req.body.tokens;
	let date_ob = new Date();
	let date = date_ob.getDate();
	let month = date_ob.getMonth() + 1;
	let year = date_ob.getFullYear();
	let hours = date_ob.getHours();
	let minutes = date_ob.getMinutes();

	notifications.notificationTime = hours + ":" + minutes;
	notifications.notificationDate = date + "-" + month + "-" + year;
	notifications.notificationTitle = req.body.title,
		notifications.notificationBody = req.body.body;
	notifications.notificationTopic = req.body.topic;
	// var tokens = ['cBUYIxlGOlE:APA91bE4ArDmAcMZ1KT2H66OQ5nggUsBLfaD3q_9uMWLqQYfn0Yb9aWakxfgnc1KnQw6R-jAQqQmdR8IzyLfjRGj8mU2Bpi9K4HtEU_RMYnR_Kvt-0QoPIjbfR67ePoaOKxH3dHHcKog', 'eYfqrGYAbz4:APA91bHS1SR6n0SfCeLOLIowJh8ihn-IQNb98Gv0tZ_qUFZGlnnriSEetpAO9sipKScMITj7dCszhgMyNdmktI4GrB7uSBLwq3hdBXHhCEdfnMkZJsGmifL3uBAsIKA4CjIYD_I2HKtS'];
	notifications.newToken = tokens;
	var message = {
		notification: {
			title: title,
			body: body
		},

		topic: topic
	};

	// Send a message to devices subscribed to the provided topic.
	admin.messaging().send(message)
		.then((response) => {
			// Response is a message ID string.
			notifications.messageId = response.message;
			notifications.save(function (err) {
				if (err) {
					res.json({
						success: false,
						message: "db err"
					});
				} else {
					res.json({
						success: true,
						message: "Successfully saved"
					});
				}
			})
			console.log(JSON.stringify(response));
			console.log('Successfully sent message:', response);
		})
		.catch((error) => {
			console.log('Error sending message:', error);
		});
}


exports.getImages = function (req, res) {
	Pic.find({}, function (err, post) {
		if (err) {
			res.json({
				success: false,
				message: "Db error"
			});

		} else
			res.json({
				name: "../Profiles/" + fileName1
			});
	})

}


// New Changes Profile Upload Api
exports.uploadprofilepic = function (req, res) {
	if (!req.file) {
		console.log("No file received");
		return res.send({
			success: false
		});
	} else {
		var a = new UserProfile();
		a.label = "last img3"
		a.fileName = req.file.filename;
		// console.log(req.file.filename + "pic");
		a.save(function (err, a) {
			if (err) throw err;
			console.error('saved img to mongo');
		})
		return res.send({
			success: true
		})
	}
}


exports.uploadprofilepiclabel = function (req, res) {

	var label1 = req.body.label;
	var description = req.body.description;
	console.log(description + "lableee");
	UserProfile.findOne({}, {}, {
		sort: {
			'_id': -1
		}
	}, function (err, post) {
		UserProfile.findOneAndUpdate({
			_id: post._id
		}, {
			$set: {
				label: label1,
				description: description
			}
		}, function (err, doc) {
			if (err) {
				console.log("Something went wrong when updating data!");
			}
			console.log(doc);
		});
	});
}




// -/////////////////////////////////////////////////////////////////////
exports.siteupdates = function (req, res) {

	if (!req.file) {
		console.log("No file received");
		return res.send({
			success: false
		});
	} else {
		var a = new Pic();
		a.label = "last img3";
		// console.log(req.file);
		a.fileName = req.file.filename;

		a.save(function (err, a) {
			if (err) throw err;
			console.error('saved img to mongo site update');
		})
		return res.send({
			success: true
		})
	}
}

exports.siteupdateslabel = function (req, res) {
	var label1 = req.body.label;
	var description = req.body.description;
	// console.log(description);
	Pic.findOne({}, {}, {
		sort: {
			'_id': -1
		}
	}, function (err, post) {
		// console.log(photos);
		Pic.findOneAndUpdate({
			_id: post._id
		}, {
			$set: {
				label: label1,
				description: description
			}
		}, function (err, doc) {
			if (err) {
				console.log("Something wrong when updating data!");
			}
		});
	});
}


exports.uploaddocuments = function (req, res) {
	if (!req.file) {
		console.log("No Document received");
		return res.send({
			success: false
		});
		// res.sendFile(path.join(__dirname, 'dist/project-name/index.html'));
	} else {
		var d = new Doc();
		d.label = "Documents"
		d.fileName = req.file.filename;
		d.save(function (err, d) {
			if (err) throw err;

			console.error('saved Document to mongo');

		})

		return res.send({
			success: true
		})

	}
}




exports.uploaddocumentslabel = function (req, res) {
	// var a = new Pic();
	var userId = req.body.userId;
	var description = req.body.description;
	console.log(description);
	Doc.findOne({}, {}, {
		sort: {
			'_id': -1
		}
	}, function (err, post) {

		Doc.findOneAndUpdate({
			_id: post._id
		}, {
			$set: {
				userId: userId,
				description: description
			}
		}, function (err, doc) {
			if (err) {
				console.log("Something wrong while updating data!");
			}
			console.log(doc);
		});
	});
}





// {'title':building A','description':'Brickwork is complete. Plastering is being done, expected to be complete in next 3 days.','images':['https://via.placeholder.com/140x100','https://via.placeholder.com/140x100']}
// {'title':building A','description':'Brickwork is complete. Plastering is being done, expected to be complete in next 3 days.','images':['https://via.placeholder.com/140x100','https://via.placeholder.com/140x100']}


// exports.uploaddocumentslabel = function (req, res) {
// 	// var a = new Pic();
// 	console.log("callded")
// 	var label1 = req.body.label;
// 	var description = req.body.description;
// 	console.log(this.label1)
// 	console.log(this.description);

// 	Doc.findOne({}, {}, {
// 		sort: {
// 			'_id': -1
// 		}
// 	}, function (err, post) {
// 		Pic.findOneAndUpdate({
// 			_id: post._id
// 		}, {
// 			$set: {
// 				label: label1,
// 				description: description
// 			}
// 		}, function (err, doc) {
// 			if (err) {
// 				console.log("Something wrong when updating data!");
// 			}

// 			console.log(doc);
// 		});

// 	});
// }