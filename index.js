'use strict';

var config = require('./config.json').mongodb
var MongoClient = require('mongodb').MongoClient

exports.handler = async (event, context, callback) => {
	var filter = event;
	context.callbackWaitsForEmptyEventLoop = false;
	let client = await MongoClient.connect(config.url, { useNewUrlParser: true });	
	let db = client.db(config.db);				
	try{
		var coll = db.collection('abs');
		let result = await coll.countDocuments({"metadata.organization": filter.metadata.organization, "metadata.product": filter.metadata.product});
		return result;		
	}	
	finally{
		client.close();
	}
}



