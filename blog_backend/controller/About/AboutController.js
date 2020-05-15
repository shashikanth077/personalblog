const userModel = require('../../models/Home/homeModel')

exports.getUserSkills = (req, res) => {
 
    if (!req.body) {
        return res.status(400).send({'success': false, 'results': null, 'msg': 'Bad request', 'cache': 0, 'ttl': 0});
    }
   
    let personalDetails = [];
    userModel.getPersonalData('',function(arrUserData){
				
		for(var i=0; i < arrUserData.length;i++) {
			
			var temp 				= {};
			temp.name = arrUserData[i].name;
			temp.designation = arrUserData[i].designation;
			temp.email = arrUserData[i].email;
			temp.phone = arrUserData[i].phone;
			temp.photo = arrUserData[i].photo;
			temp.description = arrUserData[i].description;
					
			userModel.getSkills(arrUserData[i].id,function(skills){
				var skillData = [];
				for (i = 0; i < skills.length; i++) {
					var skk = {};
					skk.skill_name = skills[i].skill_name
					skk.skill_rate = skills[i].skill_rate
					skk.skill_rate =  skills[i].skill_rate
					skillData.push(skk);
				}

				temp.skills = skillData;
				
				personalDetails.push(temp);
					
				if(arrUserData.length == 0 ) {
					return res.status(404).send({'success': false, 'results': null, 'msg': 'Data not avaiable', 'cache': 0, 'ttl': 0});
				} else {
					res.status(200).send({'success': true, 'results': personalDetails, 'msg': 'valid data', 'cache': 0, 'ttl': 0});
				}
			});
	
	    }				
				
        
    });
}; 

