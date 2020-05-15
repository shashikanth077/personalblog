/* jshint ignore:start */

const mysql = require('mysql2');

const dbMaster = mysql.createPool(config.db.master);
const dbSlave = mysql.createPool(config.db.slave);

function fnSelect(strServer, strQuery, arrFields, callback, intTimeout){
    try{
        if(intTimeout){
            var strKey = md5(strQuery+'_'+JSON.stringify(arrFields));
            cache.get(strKey, function(objData){
                if(objData){
                    console.log('Cache found...');
                    callback(JSON.parse(Buffer.from(objData.data, 'base64').toString('ascii')));
                }
                else{
                    console.log('Cache not available, fetching from db...');
                    fnFetchFromDB(strServer, strQuery, arrFields, callback, intTimeout);
                }
            });
        }
        else{
            fnFetchFromDB(strServer, strQuery, arrFields, callback);
        }
	}
    catch (error) {
		throw error;
    }
}

function fnInsert(strQuery, arrFields, callback){
    try{
        const sql = dbMaster.format(strQuery, arrFields);
        console.log(sql);
        dbMaster.query(strQuery, arrFields, function(err, rows, fields) {
            if (err) {
                console.log("Unable to insert. Error JSON:", JSON.stringify(err, null, 2));
            }
            callback(rows);
        });
	}
    catch (error) {
		throw error;
    }
}

function fnUpdate(strQuery, arrFields, callback){
    try{
        dbMaster.query(strQuery, arrFields, function(err, rows, fields) {
            if (err) {
                console.log("Unable to update. Error JSON:", JSON.stringify(err, null, 2));
            }
            console.log("rows...", rows);
            callback(rows);
        });
	}
    catch (error) {
		throw error;
    }
}

function fnFetchFromDB(strServer, strQuery, arrFields, callback, intTimeout){
    try{
        var connection = (strServer == 'master')?dbMaster:dbSlave;
        //To pring query pls enable below two lines
        const sql = connection.format(strQuery, arrFields);
        console.log(sql);
        connection.query(strQuery, arrFields, function(err, rows, fields) {
            if (err) {
                console.log("Unable to select. Error JSON:", JSON.stringify(err, null, 2));
            }
            if(intTimeout){
                cache.set(md5(strQuery+'_'+JSON.stringify(arrFields)), Buffer.from(JSON.stringify(rows)).toString('base64'), intTimeout);
            }
            callback(rows);
        });
	}
    catch (error) {
		throw error;
    }
}

module.exports.select = fnSelect;
module.exports.insert = fnInsert;
module.exports.update = fnUpdate;

/* jshint ignore:end */