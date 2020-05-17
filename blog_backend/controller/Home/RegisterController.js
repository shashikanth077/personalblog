const registerModel = require('../../models/Auth/registerModel');
const commonModel = require('../../models/commonModel');
const md5 = require('md5');
var urllib = require('urllib');

//409 status if email or phone number already exits.405 in valid method request.
exports.createUser = (req, res) => {
    
    
    if(req.method != "POST") {
        return res.status(405).send({'success': false, 'results': null, 'msg': 'Method not allowed. Please send in POST method', 'cache': 0, 'ttl': 0});
    }
    
    if (!req.body) {
        return res.status(400).send({'success': false, 'results': null, 'msg': 'Bad Request', 'cache': 0, 'ttl': 0});
    }

    if(!req.body.email || req.body.email === "") {
        return res.status(422).send({'success': false, 'results': null, 'msg': 'Email name can not be empty', 'cache': 0, 'ttl': 0});
    }

    if(!req.body.password || req.body.password === "") {
        return res.status(422).send({'success': false, 'results': null, 'msg': 'Password can not be empty', 'cache': 0, 'ttl': 0});
    }

    if(!req.body.phonenumber || req.body.phonenumber === "") {
        return res.status(422).send({'success': false, 'results': null, 'msg': 'phone number can not be empty', 'cache': 0, 'ttl': 0});
    }

    if(!req.body.customerCode || req.body.customerCode === "") {
        return res.status(422).send({'success': false, 'results': null, 'msg': 'Customer Code can not be empty', 'cache': 0, 'ttl': 0});
    }

    var today = new Date();
    registerModel.updateUser(req.body.name,req.body.email,md5(req.body.password),req.body.phonenumber,today,req.body.customerCode,function(arrUserData){
        
        if(arrUserData.affectedRows > 0){

            var currentOTP = '';    
            registerModel.getOTP(req.body.customerCode,'register',function(arrOTPData){

               if(arrOTPData.length > 0 ) {
                    currentOTP = arrOTPData[0].otp;
               }  else {
                    currentOTP =  Math.floor(100000 + Math.random() * 900000);
                    registerModel.insertOTP(req.body.customerCode,req.body.phonenumber,currentOTP,today,'register',function(arrInsertData){
                        if(arrInsertData.affectedRows > 0) {
                            console.log("otp inserted to db");
                        }
                    }); 
               } 
                  
               let templateId = templates.sms.register_customer;
               let otpType = "Registration OTP";
               let arrSMSData = [];
               let arrTempData = {};
               arrTempData.to = req.body.phonenumber;
               arrTempData.message = '';
               arrTempData.otp = currentOTP;
               arrTempData.brand = "FGS";
               arrSMSData.push(arrTempData);

               commonModel.SendMessage(arrSMSData, templateId, req.body.customerCode, req.body.email,req.body.phonenumber, otpType,function(arrFinalData) {
                   if(arrFinalData.otpstatus) {
                    res.status(200).send({'success': true, 'results': null, 'msg': 'User registraton successfully', 'cache': 0, 'ttl': 0}); 
                   }
               });
            });    
        } else {
            return res.status(200).send({'success': false, 'results': null, 'msg': 'Error in registration please try again', 'cache': 0, 'ttl': 0}); 
        }
    });
};   

exports.getUserdetailsbyStoreId = (req, res) => {
    
    if (!req.body) {
      return res.status(400).send({'success': false, 'results': null, 'msg': 'Bad request', 'cache': 0, 'ttl': 0});
    }

    let storeID = req.body.customerCode;
    if(!storeID || storeID === "") {
        return res.status(422).send({'success': false, 'results': null, 'msg': 'Store ID can not be empty', 'cache': 0, 'ttl': 0});
    }

    registerModel.getUserdetailsbyStoreId(storeID,function(arrUserData){
        if(arrUserData.length == 0 ) {
            return res.status(404).send({'success': false, 'results': null, 'msg': 'Store ID not available', 'cache': 0, 'ttl': 0});
        } else {

            if(arrUserData[0].a_verified == '1') {
                return res.status(409).send({'success': false, 'results': null, 'msg': 'This Customer code is already registered!', 'cache': 0, 'ttl': 0});
            }
            res.status(200).send({'success': true, 'results':  JSON.stringify(arrUserData), 'msg':'customer details', 'cache': 0, 'ttl': 0});
        }
    });

}; 

exports.checkPhonenumberRegistered = (req, res) => {
    
    if (!req.body) {
        return res.status(400).send({'success': false, 'results': null, 'msg': 'Bad request', 'cache': 0, 'ttl': 0});
    }

    if(!req.body.phonenumber || req.body.phonenumber === "") {
        return res.status(422).send({'success': false, 'results': null, 'msg': 'Phone number can not be empty', 'cache': 0, 'ttl': 0});
    }

    registerModel.checkPhonenumberExists(req.body.phonenumber,function(arrUserData){

        if(arrUserData.length >0 ){
            if(arrUserData[0].a_verified == '1') {
               return res.status(409).send({'success': false, 'results': null, 'msg': 'Phone number is already registered!', 'cache': 0, 'ttl': 0});
            }
        }   
        res.status(200).send({'success': true, 'results': null, 'msg':'', 'cache': 0, 'ttl': 0});
        
    });

}; 

exports.checkEmailRegistered = (req, res) => {
    
    if (!req.body) {
       return res.status(400).send({'success': false, 'results': null, 'msg': 'Bad request', 'cache': 0, 'ttl': 0});
    }

    if(!req.body.email || req.body.email === "") {
        return res.status(422).send({'success': false, 'results': null, 'msg': 'Email can not be empty', 'cache': 0, 'ttl': 0});
    }

    registerModel.checkEmailExists(req.body.email,function(arrUserData){

        if(arrUserData.length >0 ){
            if(arrUserData[0].a_verified == '1') {
               return res.status(409).send({'success': false, 'results': null, 'msg': 'Email address is already registered!', 'cache': 0, 'ttl': 0});
            }
        }    
        res.status(200).send({'success': true, 'results': null, 'msg':'', 'cache': 0, 'ttl': 0});
        
    });

}; 