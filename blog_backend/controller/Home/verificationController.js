const verifictionModel = require('../../models/Auth/verificationModel');
const registerModel = require('../../models/Auth/registerModel');
const commonModel = require('../../models/commonModel');
const md5 = require('md5');
const loginModel = require('../../models/Auth/loginModel');

exports.OTPVerify = (req, res) => {
    
    let otp  = req.body.otp;
    
    if(req.method != "POST") {
        return res.status(405).send({'success': false, 'results': null, 'msg': 'Method not allowed. Please send in POST method', 'cache': 0, 'ttl': 0});
    }

    if (!req.body) {
        return res.status(400).send({'success': false, 'results': null, 'msg': 'Bad Request', 'cache': 0, 'ttl': 0});
    }

    if(!req.body.otp || req.body.otp === "") {
        return res.status(422).send({'success': false, 'results': null, 'msg': 'OTP can not be empty', 'cache': 0, 'ttl': 0});
    }

    if(!req.body.customerCode || req.body.customerCode === "") {
        return res.status(422).send({'success': false, 'results': null, 'msg': 'Customer Code can not be empty', 'cache': 0, 'ttl': 0});
    }

    registerModel.getOTP(req.body.customerCode,'register',function(arrOTPData){

        loginModel.CheckUserExists(req.body.customerCode,function(arrUserData) {
            if(arrUserData.length == 0) {
                return res.status(404).send({'success': false, 'results': null, 'msg': 'User Code not available', 'cache': 0, 'ttl': 0});
            } else {
               if(arrOTPData.length > 0 ) {
                    if(arrOTPData[0].otp == otp) {
                     verifictionModel.UpdateUserStatus(req.body.customerCode,function(arrOTPData){
                        if(arrOTPData.affectedRows > 0) {
                         res.status(200).send({'success': true, 'results': null, 'msg': 'User Verified Successfully', 'cache': 0, 'ttl': 0});
                        } 
                     });    
                    } else {
                        return res.status(422).send({'success': false, 'results': null, 'msg': 'Please enter valid OTP', 'cache': 0, 'ttl': 0});
                    }
                 } else {
                     return res.status(404).send({'success': false, 'results': null, 'msg': 'No data Available for your customer code', 'cache': 0, 'ttl': 0});
                 }      
            }

        });    
    });       
} 

module.exports.getFormattedDate = function(date) {
    var todayTime = new Date(date);
    console.log("getFormattedDate....", todayTime);
    var month = todayTime.getMonth() + 1;
    var day = todayTime.getDate();
    var year = todayTime.getFullYear();
    var hour = todayTime.getHours();
    var minute = todayTime.getMinutes();
    if(minute.length == 1) {
        minute = '0'+minute;
    }
    var second = todayTime.getSeconds();
    return year+'-'+month+'-'+day+ " "+hour+":"+minute+":"+second;
}

exports.OTPResend = (req, res) => {
    
        var me = this;
        var today = me.getFormattedDate(new Date());

        if (!req.body) {
            return res.status(400).send({'success': false, 'results': null, 'msg': 'Bad Request', 'cache': 0, 'ttl': 0});
        }

        if(req.method != "POST") {
            return res.status(405).send({'success': false, 'results': null, 'msg': 'Method not allowed. Please send in POST method', 'cache': 0, 'ttl': 0});
        }

        if(!req.body.customerCode || req.body.customerCode === "") {
            return res.status(422).send({'success': false, 'results': null, 'msg': 'Customer Code can not be empty', 'cache': 0, 'ttl': 0});
        }

        if(!req.body.type || req.body.type === "") {
            return res.status(422).send({'success': false, 'results': null, 'msg': 'Resend type required.', 'cache': 0, 'ttl': 0});
        }
        
        loginModel.CheckUserExists(req.body.customerCode,function(arrUserData) {
            if(arrUserData.length == 0) {
                return res.status(404).send({'success': false, 'results': null, 'msg': 'User Code not available', 'cache': 0, 'ttl': 0});
            }    
        });    

       
        let type = req.body.type;
       
        registerModel.getOTP(req.body.customerCode,type,function(arrOTPData){
        let currentOTP = '';
   
        if(arrOTPData.length > 0 ) {
             currentOTP = arrOTPData[0].otp;
        }  else {
             currentOTP =  Math.floor(100000 + Math.random() * 900000);
             registerModel.insertOTP(req.body.customerCode,req.body.phonenumber,currentOTP,today,type,function(arrInsertData){
                 if(arrInsertData.affectedRows > 0) {
                     console.log("otp inserted to db");
                 }
             }); 
        }  

        verifictionModel.getUserDetails(req.body.customerCode,function(arrUserDetails){
            if(arrUserDetails.length > 0) {
                let templateId = templates.sms.register_customer;
                let otpType = "Resend OTP";
                let arrSMSData = [];
                let arrTempData = {};
                arrTempData.to = req.body.phonenumber;
                arrTempData.message = '';
                arrTempData.otp = currentOTP;
                arrTempData.brand = "FGS";
                arrSMSData.push(arrTempData);

                commonModel.SendMessage(arrSMSData, templateId, req.body.customerCode, arrUserDetails[0].a_user_email,req.body.phonenumber, otpType,function(arrOTPData) {
                    if(arrOTPData.otpstatus) {
                        res.status(200).send({'success': true, 'results': null, 'msg': 'OTP resent..', 'cache': 0, 'ttl': 0}); 
                       }
                });
            }
        });    

    });       
}  

exports.forgotPassword = (req, res) => {

    if(req.method != "POST") {
        return res.status(405).send({'success': false, 'results': null, 'msg': 'Method not allowed. Please send in POST method', 'cache': 0, 'ttl': 0});
    }

    if (!req.body) {
        return res.status(400).send({'success': false, 'results': null, 'msg': 'Bad Request', 'cache': 0, 'ttl': 0});
    }

    if(!req.body.username || req.body.username === "") {
        return res.status(422).send({'success': false, 'results': null, 'msg': 'Username can not be empty', 'cache': 0, 'ttl': 0});
    }

    loginModel.CheckUserExists(req.body.username,function(arrUserData) {
        if(arrUserData.length == 0) {
            return res.status(404).send({'success': false, 'results': null, 'msg': 'Username not available', 'cache': 0, 'ttl': 0});
        } else {

            let currentOTP = '';
            var today = new Date();

            verifictionModel.checkMaxotp(arrUserData[0].a_user_phone,function(arrCheckData) {
                if(arrCheckData[0].cnt <= 3){ 
                    registerModel.getOTP(arrUserData[0].a_user_name,'forgotpassword',function(arrOTPData){
                       
                        if(arrOTPData.length > 0 ) {
                            currentOTP = arrOTPData[0].otp;
                        } else {
                            currentOTP =  Math.floor(100000 + Math.random() * 900000);
                            registerModel.insertOTP(arrUserData[0].a_user_name,arrUserData[0].a_user_phone,currentOTP,today,'forgotpassword',function(arrInsertData){
                                if(arrInsertData.affectedRows > 0) {
                                    console.log("otp inserted to db");
                                }
                            });
                        }   
                            let templateId = templates.sms.forgot_password;
                            let otpType = "Forgot password OTP";
                            let arrSMSData = [];
                            let arrTempData = {};
                            arrTempData.to = arrUserData[0].a_user_phone;
                            arrTempData.message = '';
                            arrTempData.otp = currentOTP;
                            arrTempData.brand = "FGS";
                            arrSMSData.push(arrTempData);
                            
                            console.log(arrUserData);

                            commonModel.SendMessage(arrSMSData,templateId,arrUserData[0].a_user_name,arrUserData[0].a_user_email,arrUserData[0].a_user_phone, otpType,function(arrFinalData) {
                                if(arrFinalData.otpstatus) {
                                    res.status(200).send({'success': true, 'results': arrUserData, 'msg': 'OTP sent successfully', 'cache': 0, 'ttl': 0}); 
                                }
                            });
                         
                    });   
                } else {
                    return res.status(200).send({'success': false, 'results': null, 'msg': 'You have exceeded max attempts 3 in an hour. Please try again after some time', 'cache': 0, 'ttl': 0});
                }   
            });
        }
    });    
}   

exports.verifyForgotOTPAndChangePassword = (req, res) => {
   
    if(req.method != "POST") {
        return res.status(405).send({'success': false, 'results': null, 'msg': 'Method not allowed. Please send in POST method', 'cache': 0, 'ttl': 0});
    }

    if (!req.body) {
        return res.status(400).send({'success': false, 'results': null, 'msg': 'Bad Request', 'cache': 0, 'ttl': 0});
    }
    
    if(!req.body.username || req.body.username === "") {
        return res.status(422).send({'success': false, 'results': null, 'msg': 'Username can not be empty', 'cache': 0, 'ttl': 0});
    }

    if(!req.body.otp || req.body.otp === "") {
        return res.status(422).send({'success': false, 'results': null, 'msg': 'OTP can not be empty', 'cache': 0, 'ttl': 0});
    }

    if(!req.body.newpassword || req.body.newpassword === "") {
        return res.status(422).send({'success': false, 'results': null, 'msg': 'New password can not be empty', 'cache': 0, 'ttl': 0});
    }

    loginModel.CheckUserExists(req.body.username,function(arrUserData) {
        if(arrUserData.length == 0) {
            return res.status(404).send({'success': false, 'results': null, 'msg': 'Username not available', 'cache': 0, 'ttl': 0});
        } else {
            registerModel.getOTP(arrUserData[0].a_user_name,'forgotpassword',function(arrOTPData){
                       if(arrOTPData.length > 0 ) {
                            if(arrOTPData[0].otp == req.body.otp) {
                                loginModel.changePassword(arrUserData[0].a_user_id,md5(req.body.newpassword),function(status){
                                    if(status.affectedRows > 0) {
                                       res.status(200).send({'success': true, 'results': arrUserData, 'msg': 'password changed successfully', 'cache': 0, 'ttl': 0});
                                    } else {
                                       return res.status(200).send({'success': false, 'results': null, 'msg': 'there is problem in update password. Please try again', 'cache': 0, 'ttl': 0});
                                    }
                                 });     
                            } else {
                                return res.status(422).send({'success': false, 'results': null, 'msg': 'Please enter valid OTP', 'cache': 0, 'ttl': 0});
                            }
                         } else {
                             return res.status(200).send({'success': false, 'results': null, 'msg': 'There is problem in otp verification. Please try again', 'cache': 0, 'ttl': 0});
                         }  
            });
        }
    });    
}    
