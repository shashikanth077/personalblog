const loginModel = require('../../models/Home/homeModel')

exports.insertContactData = (req, res) => {
      
    //for validation 422 status code,if not found 404,if success 200,for authorization 401
    if (!req.body) {
        return res.status(400).send({'success': false, 'results': null, 'msg': 'Bad request', 'cache': 0, 'ttl': 0});
    }
   
 //  console.log(req);
    loginModel.insertContactData(req.body.contactData,function(arrUserData){
		
         res.status(200).send({'success': true, 'results': true, 'msg': 'Inserted Successfully', 'cache': 0, 'ttl': 0});
        
    });
}; 

