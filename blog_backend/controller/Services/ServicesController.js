const loginModel = require('../../models/Home/homeModel')

exports.getServices = (req, res) => {
      
    //for validation 422 status code,if not found 404,if success 200,for authorization 401
    if (!req.body) {
        return res.status(400).send({'success': false, 'results': null, 'msg': 'Bad request', 'cache': 0, 'ttl': 0});
    }
   
    loginModel.getServices('',function(arrUserData){
        if(arrUserData.length == 0 ) {
            return res.status(404).send({'success': false, 'results': null, 'msg': 'Data not avaiable', 'cache': 0, 'ttl': 0});
        } else {
            res.status(200).send({'success': true, 'results': arrUserData, 'msg': 'Logged in succesfully', 'cache': 0, 'ttl': 0});
        }
    });
}; 

