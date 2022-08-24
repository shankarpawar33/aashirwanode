var express = require('express');
var mongoose = require('mongoose');
var app = express();
var config = require('./config');
var bodyParser = require('body-parser');
var session = require('express-session');
var FCM = require('fcm-node')
var url = "mongodb://localhost/newAppData";
var multer = require('multer');
var path = require('path');

var serverKey = 'AAAAJ3qD5jQ:APA91bH19g0GV-LVWhWt97hW8V970VCDvfhfKPyBBiksE62I8l1aHNwyvz48Wl4F_26XEz0EWBZ0uJkfWrupkOZF5ZLo1Hd0cw6r-2TD874zPmP0uV6gw-Gq4oRArRUdZ7kxG0iKrz_G';
var fcm = new FCM(serverKey);
app.use('/imageData', express.static("./IMGDATA"));



var DIR = './IMGDATA';

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '.' + path.extname(file.originalname));
  }
});
let upload = multer({
  storage: storage
});


mongoose.connect(config.database, {
  useNewUrlParser: true
});
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(session({
  secret: config.secret,
  saveUninitialized: true,
  resave: true,
  useNewUrlParser: true
}));

app.use(function (req, res, next) {
  var allowedOrigins = ['http://localhost:8100,http://localhost:4200'];
  var origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Origin", "http://localhost:8100");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Access-Token");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
});





app.listen(7046);
console.log("server listning on 7046");
app.use('/api', require('./routes/api'));
app.set('superSecret', config.secret);
app.set('adminSecret', config.adminSecret);
app.use(function (req, res) {
  console.log("welcome");

})