
module.exports.getPersonalData = (username,callback) => {
    let strQuery = 'select * from user_details';
	let arrFields = [];
    db.select("slave",strQuery, arrFields, function (arrResults) {
        callback(arrResults);
    });
}

module.exports.getSkills = (id,callback) => {
    let strQuery = 'select * from skills where user_id = ?';
	let arrFields = [id];
    db.select("slave",strQuery, arrFields, function (arrResults) {
        callback(arrResults);
    });
}

module.exports.getBlogs = (id,callback) => {
    let strQuery = 'select * from blog';
	let arrFields = [];
    db.select("slave",strQuery, arrFields, function (arrResults) {
        callback(arrResults);
    });
}

module.exports.getServices = (id,callback) => {
    let strQuery = 'select * from services';
	let arrFields = [];
    db.select("slave",strQuery, arrFields, function (arrResults) {
        callback(arrResults);
    });
}


module.exports.insertContactData = function (arrUserData, callback) {
	let arrCommunicationData = [arrUserData.name, arrUserData.email, arrUserData.message, arrUserData.subject];
	let strInsertQuery = 'INSERT INTO contact(name, email, message, subject) VALUES (?,?,?,?)';
	db.insert(strInsertQuery, arrCommunicationData, function(arrRows) {
		callback(arrRows)
	});
}

