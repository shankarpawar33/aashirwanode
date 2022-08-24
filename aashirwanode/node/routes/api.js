var express = require('express');
var app = express();
var user = require('../routes/user');

const path = require('path');
const fs = require('fs');
const multer = require('multer');

var DIR = './IMGDATA';


let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'photo') {
            DIR = './IMGDATA';
        } else if (file.fieldname === 'doc') {
            DIR = './uploadeddocuments';
            console.log("doccccs");
        } else if (file.fieldname === 'profilepic') {
            DIR = './Profiles';
            // console.log("profile pic")

        }
        console.log(DIR);
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        // console.log(file.fieldname);
    }
});


let upload = multer({
    storage: storage
});


var router = express.Router();
router.route('/register').post(user.register);
router.route('/login').post(user.login);
router.route('/adminlogin').post(user.adminlogin);


router.route('/getuserdetails').post(user.getUserDetails);
router.route('/getsiteupdates').post(user.getsiteupdates);


router.route('/getImages').get(user.getImages);



router.route('/getnotificatintisdetails').post(user.getnotificatintisdetails);
router.route('/removeuser').post(user.removeuser);



router.route('/notification').post(user.notification);
router.route('/notificationtopic').post(user.notificationtopic);
router.route('/addnewtoken').post(user.addnewtoken);

router.route('/siteupdates').post(upload.single('photo'), user.siteupdates) //multiple photos at a time
router.route('/uploaddocuments').post(upload.single('doc'), user.uploaddocuments) //multiple photos at a time

router.route('/uploadprofilepic').post(upload.single('profilepic'), user.uploadprofilepic) //single photo
router.route('/uploadprofilepiclabel').post(upload.single('s'), user.uploadprofilepiclabel) //profile pic lable 

router.route('/siteupdateslabel').post(upload.single('doc'), user.siteupdateslabel)
router.route('/uploaddocumentslabel').post(upload.single('doc'), user.uploaddocumentslabel)







module.exports = router;