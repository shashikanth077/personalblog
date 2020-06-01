/* jshint ignore: start */
module.exports = function (fastify, opts, next) {
  const schema = require(__basedir + '/schema/checkout/checkout');

  fastify.post('/submitorder', {
    schema
  }, (request, reply) => {
    const checkoutModel = require(__basedir + '/models/checkout/checkoutModel');

    try {

      let errors = [];

      let intuserId = xss(request.body.userID);
      let intcartId = xss(request.body.cartID);
      let orderId = 0;
      let date = new Date();

      async.waterfall([
        function validate(done) {
          if (intuserId == 0 || intuserId == undefined) {
            errors.push('INVALID_USER_ID');
          }

          if (intuserId != 0 && isNaN(intuserId)) {
            errors.push('INVALID_USER_ID');
          }

          if (intcartId == 0 || intcartId == undefined) {
            errors.push('INVALID_CART_ID');
          }

          if (intcartId != 0 && isNaN(intcartId)) {
            errors.push('INVALID_CART_ID');
          }

          if (errors.length > 0) {
            reply.code(200).send({
              'success': false,
              'results': [],
              'msg': errors
            });
          } else {
            checkoutModel.getcartBasicDetails(intcartId, intuserId, function (arrResults) {
              done(null, arrResults);
            });
          }
        },

        function submitOrders(prevDetails, done) {
          if (prevDetails.length == 0) {
            reply.code(200).send({
              'success': false,
              'results': [],
              'msg': ['CART_DATA_EMPTY'],
              'cache': 0,
              'ttl': 0
            });
          } else {
            console.log('order started');
            checkoutModel.insertOrderSummaryData(prevDetails[0].a_user_id, prevDetails[0].a_cart_id, prevDetails[0].a_total_mrp, prevDetails[0].a_grand_quantity, prevDetails[0].a_grand_total_products, function (OrderLastInsertId) {
              if (OrderLastInsertId == 0) {
                reply.code(500).send({
                  'success': false,
                  'results': [],
                  'msg': ['NO_PRODUCT_FOUND']
                });
              } else {

                checkoutModel.getAllconfirmOrderDetails(prevDetails[0].a_cart_id, function (CartDetails) {
                  if (CartDetails.length > 0) {

                    let cartArr = [];
                    //console.log(CartDetails);
                    for (var j = 0; j < CartDetails.length; j++) {
                      cartArr[j] = [OrderLastInsertId, "" + CartDetails[j].a_ean, "" + CartDetails[j].a_size, "" + CartDetails[j].a_color, "" + CartDetails[j].a_colorcode, "" + CartDetails[j].a_codehexa, "" + CartDetails[j].a_quantity, "" + CartDetails[j].a_product_id, "" + CartDetails[j].a_stylecode, "" + CartDetails[j].a_productname, "" + CartDetails[j].a_mrp_price, "" + CartDetails[j].a_gender, "" + CartDetails[j].a_categorygroup, "" + CartDetails[j].a_category, "" + CartDetails[j].a_range, "" + CartDetails[j].a_packqty, "" + CartDetails[j].a_moq, "" + CartDetails[j].a_brand, "" + CartDetails[j].a_wsp_price, "" + CartDetails[j].a_total_mrp, "" + CommonModel.getFormattedDate(date), "" + CommonModel.getFormattedDate(date)];
                    }

                    checkoutModel.InsertOrderDetails(cartArr, function (OrderRows) {

                      var ObjOrders = {};

                      ObjOrders.OrderID = OrderLastInsertId;
                      ObjOrders.CartID = prevDetails[0].a_cart_id;

                      if (OrderRows > 0) {
                        //update cart status;
                        checkoutModel.UpdateOrderPlacFlag(prevDetails[0].a_cart_id, function (OrderRows) {
                          checkoutModel.UpdateCartDeleteFlag(prevDetails[0].a_cart_id, function (OrderRows) {

                            let confirmationOrders = {};
                            confirmationOrders.OrderID = OrderLastInsertId;
                            confirmationOrders.OrderValue = prevDetails[0].a_total_mrp;
                            confirmationOrders.OrderPcs = prevDetails[0].a_grand_quantity;
                            confirmationOrders.userID = prevDetails[0].a_user_id;
                            //console.log(confirmationOrders);
                            done(null, confirmationOrders);
                          });
                        });
                      } else {
                        reply.code(500).send({
                          'success': false,
                          'results': [],
                          'msg': ['ERROR_WHILE_EXECUSION']
                        });
                      }
                    });
                  } else {
                    reply.code(500).send({
                      'success': false,
                      'results': [],
                      'msg': ['ERROR_WHILE_EXECUSION']
                    });
                  }
                });

              }
            });
          }
        },

        function sendConfirmationSMS(orderDetails, done) {

          if (orderDetails.userID != '') {
            let templateId = templates.sms.vhretailer;
            let templatedistributorId = templates.sms.vhdistributor;

            let otpType = "order_confirmation";

            //get the user details
            CommonModel.getRetailerInfoByID(orderDetails.userID, function (userDetails) {

              //for retailer
              let arrSMSData = [];
              let arrTempData = {};
              arrTempData.to = userDetails[0].mobile;
              arrTempData.message = '';
              arrTempData.customer_name = userDetails[0].name;
              arrTempData.order_id = orderDetails.OrderID;
              arrTempData.order_value = orderDetails.OrderValue;
              arrTempData.quantity = orderDetails.OrderPcs;
              arrSMSData.push(arrTempData);

              const communication = require(__basedir + '/lib/communication');

              CommonModel.sendSMS(arrSMSData, templateId, userDetails[0].retailerCode, userDetails[0].mobile, otpType, orderDetails.OrderID, function (arrCommunicationResults) {
                if (arrCommunicationResults['affectedRows'] > 0 && arrCommunicationResults['DuplicateCommunication'] === 0) {

                  let requestObject = {};
                  requestObject.templateId = templateId;
                  requestObject.arrSMSData = arrSMSData;
                  requestObject.mobilenumber = userDetails[0].mobile;

                  communication.sendSMS(requestObject, function (status) {
                    console.log('status--> ' + status);
                    if (status) {
                      console.log('sms send for retailer');
                    } else {
                      console.log('sms failed for retailer');
                    }
                  });

                } else {
                  console.log('already sent sms');
                }
              }); //
              
              //for distributor
              CommonModel.getDistributorRetailerDetails(userDetails[0].retailerCode, function (distributorDetails) {
                if (distributorDetails.length > 0) {
                
                  for(var j=0;j<distributorDetails.length;j++)	{
                      //console.log("mobile number --"+distributorDetails[j].disMobile);
                      let intdistMobile = distributorDetails[j].disMobile;
    
                      let arrdistributorSMSData = [];
                      let arrdistributorTempData = {};
    
                      arrdistributorTempData.to = intdistMobile;
                      arrdistributorTempData.message = '';
                      arrdistributorTempData.customer_name = distributorDetails[j].a_customername;
                      arrdistributorTempData.order_id = orderDetails.OrderID;
                      arrdistributorTempData.retailer_name = userDetails[0].name;
                      arrdistributorSMSData.push(arrdistributorTempData);
    
                      CommonModel.sendSMS(arrdistributorSMSData, templatedistributorId, distributorDetails[j].a_customername, intdistMobile, otpType, orderDetails.OrderID, function (arrCommunicationResults) {
                        if (arrCommunicationResults['affectedRows'] > 0 && arrCommunicationResults['DuplicateCommunication'] === 0) {
    
                          let requestObject = {};
                          requestObject.templateId = templatedistributorId;
                          requestObject.arrSMSData = arrdistributorSMSData;
                          requestObject.mobilenumber = intdistMobile
    
                          communication.sendSMS(requestObject, function (status) {
                            console.log('status--> ' + status);
                            if (status) {   
                              console.log('sms send for distributor');
                            } else {
                              console.log('sms failed for distributor');
                            }
                          });
    
                        } else {
                          console.log('already sent sms');
                        }
                      });
                      
                  	//send email
    				let mail_input = {};
                    let envelope_input = {};
                    let block_input = {};
                    let filter_input = {};
                    let arrTemp = {};
                    let mailType = 'Order confirmation';
        			let templateEmail = templates.mail.orderconfirm;
        			
    				arrTemp.environmentid = 1;
                    arrTemp.campaignid = templateEmail;
                    
    				envelope_input.myfit_envelope ={};
    				envelope_input.myfit_envelope.email_to = distributorDetails[j].a_email;
    				envelope_input.myfit_envelope.firstname = distributorDetails[j].a_customername;
    				envelope_input.myfit_envelope.lastname= '';
    				envelope_input.myfit_envelope.subject= 'New order confirmation';
    				
    				// //CC
    				let ccArr  = [];
    				let CcArray = [];
    			
    				ccArr[distributorDetails[j].a_rsm_mail] = distributorDetails[j].a_rsm_mail;
    				ccArr[distributorDetails[j].a_asm_mail] = distributorDetails[j].a_asm_mail;
    				ccArr[distributorDetails[j].se_mail_1] = distributorDetails[j].se_mail_1;
    				ccArr[distributorDetails[j].se_mail_2] = distributorDetails[j].se_mail_2;	
                    
                    for (var key in ccArr) {
                        let CcObject = {};
    					CcObject.email_cc 		= 	ccArr[key];
    					CcObject.firstname_cc   =   distributorDetails[j].a_customername;
                        CcArray.push(CcObject);    
                    }
            
    				envelope_input.myfit_envelope.cc_array = CcArray;
    			
              let url = "<a href=" 'https://'+request.headers.host+"/orders/downloadOrders/"+orderDetails.OrderID+" " target='__blank' >Click on link to download orders</a>"; 
                           		block_input.order_details_vh_retail = {};
                    block_input.order_details_vh_retail.name = distributorDetails[j].a_customername;
                    block_input.order_details_vh_retail.path = url;
                    
                    block_input.header_default = []   
                    block_input.footer_default = [];
                    
    				filter_input.sample = 'sample';
                    mail_input.a_shopid = constants.BRAND_ID;
                    mail_input.envelop = envelope_input;
                    mail_input.block = block_input;
                    mail_input.filter = filter_input;
                    mail_input.campaign = arrTemp;
                    mail_input.mailType = mailType;
        		    
         		    CommonModel.sendMail(mail_input,distributorDetails[0].a_customercode,distributorDetails[0].a_email,distributorDetails[0].disMobile,mailType,0, function (arrCommunicationResults) {
        		    	//console.log('checking duplicate');
        		    	if (arrCommunicationResults['affectedRows'] > 0 && arrCommunicationResults['DuplicateCommunication'] === 0) {
    						//console.log('after checking duplicate');
    						communication.sendMail(mail_input, function (status) {
    						//	console.log('mail status--> ' + status);
    							if (status) {   
    								console.log('mail send for distributor');
    							} else {
    								console.log('mail failed for distributor');
    							}
    						});
        		    	}	
        	    });	
        
                }
               } else { // end of dis
                 console.log('distributor not there for this retailer code');
               }
             });

            });
          }

          reply.code(200).send({
            'success': true,
            'results': orderDetails,
            'msg': ['ORDERS_ADDED']
          });

        }

      ]);
    } catch (error) {
    
      reply.code(500).send({
        'success': false,
        'results': error,
        'msg': error
      });
    }
  });

  next();
}
