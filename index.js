'use strict';

var config = require('./config.json').mongodb
var MongoClient = require('mongodb').MongoClient

//autoworld.organizationCount
//autoworld.organizations
//autoworld.aspects

//wiki.organizations
//wiki.products

//organization.sentimentSnapshot = async (org) => total reviews/positive/negative
//organization.productCount
//organization.products
//organization.mostPositive(howmany, whattimeperiod) => URLList

//product.sentimentSnapshot() = async (org) => total reviews/positive/neutral/negative
//product.aspectSnapshot => total reviews/positive/negative per aspect
exports.organizationCount = 
exports.getDocumentCount = async (event, context, callback) => {
	var filter = event;
	context.callbackWaitsForEmptyEventLoop = false;
	let client = await MongoClient.connect(config.url, { useNewUrlParser: true });	
	let db = client.db(config.db);		
	var ss = [];
	var i = 0;
	var sentimentStats = {"positive": 0, "negative": 0, "reviews": 0};
	try{
		var coll = db.collection('sentiment');
		let results = await coll.find({"metadata.organization": filter.metadata.organization}).forEach(function(doc){
			ss[i++] = doc.result.result;			
		});
		client.close();
		sentimentStats.reviews = ss.length;
		var i =0;
		console.log(ss[i].polarity)
		ss.map(record => console.log(record));
		return sentimentStats;		
	}	
	finally{
		
	}
}



