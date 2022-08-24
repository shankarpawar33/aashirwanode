var express = require('express');
var app = express();

var User = require('../models/user');
var Pic = require('../models/images');
var Doc = require('../models/documents');
var Notifications = require('../models/notifications');
var Admin = require('../models/admin')
var UserProfile = require('../models/userprofile');


var bcrypt = require('bcrypt-nodejs');
var serverKey = 'AAAAJ3qD5jQ:APA91bH19g0GV-LVWhWt97hW8V970VCDvfhfKPyBBiksE62I8l1aHNwyvz48Wl4F_26XEz0EWBZ0uJkfWrupkOZF5ZLo1Hd0cw6r-2TD874zPmP0uV6gw-Gq4oRArRUdZ7kxG0iKrz_G';
var FCM = require('fcm-push');
var fcm = new FCM(serverKey);
var admin = require('firebase-admin');
// var admin = require("firebase-admin");


app.use('/public', express.static("./IMGDATA"));
app.use('/public', express.static("./Profiles"));

var fileName1;
var newName;
var serviceAccount = require("../routes/delightapp-1-firebase-adminsdk-ldn67-25aea4579d.json");



admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://delightapp-1.firebaseio.com"
});

exports.register = function (req, res) {
	// console.log(req.body.userName)
	var user = User();
	user.firstName = req.body.firstName;
	user.lastName = req.body.lastName;
	// user.userName = req.body.userName;
	user.userMob = req.body.userMob;
	// user.newToken = req.body.newToken;
	user.email = req.body.email;
	user.floor = req.body.floor;
	user.flatNo = req.body.flatNo;
	user.wingName = req.body.wingName;
	user.userPassword = bcrypt.hashSync(req.body.userPassword);
	// user.userconPassword = bcrypt.hashSync(req.body.userconPassword);
	user.save(function (err) {
		if (err) {
			res.json({
				success: false,
				message: "Mobile Number and Email is Must Be Unique"
			});
		} else {
			res.json({
				success: true,
				message: "Successfully saved"
			});
		}
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
				success: false,
				message: "invalid usename"
			});
		} else if (!user) {
			res.json({
				success: false,
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
					success: false,
					message: "wrong password"
				});
			}
		}
	})
}



exports.login = function (req, res) {
	console.log(req.body.userName, req.body.userPassword);
	var user = User();
	User.findOne({
		userName: req.body.userName
	}, function (err, user) {
		if (err) {
			res.json({
				success: false,
				message: "invalid usename"
			});
		} else if (!user) {
			res.json({
				success: false,
				message: 'Authentication failed. User not found.'
			});
		} else {

			if (bcrypt.compareSync(req.body.userPassword, user.userPassword)) {
				res.json({
					success: true,
					message: "Successfully login",
					user: {
						"firstName": user.firstName,
						"lastName": user.lastName,
						"userMob": user.userMob,
						"email": user.email,
						"floor": user.floor,
						"flatNo": user.flatNo,
						"wingName": user.wingName
					}
				});
			} else {
				res.json({
					success: false,
					message: "wrong password",

				});
			}
		}
	})

}




exports.getUserDetails = function (req, res) {
	var user = User();
	User.find({}, function (err, post) {


		console.log(post);
		return res.json({
			users: post
		});
	})
}

// {'title':building A','description':'Brickwork is complete. Plastering is being done, expected to be complete in next 3 days.','images':['https://via.placeholder.com/140x100','https://via.placeholder.com/140x100']}



exports.getsiteupdates = function (req, res) {
	var user = User();
	var userId = req.body.userId;
	console.log(userId)
	Pic.find({}, function (err, post) {
		return res.json({
			users: post
		});


	})
}


exports.OrderJaar=function(req,res){
var orders 
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
// return 0;
}





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