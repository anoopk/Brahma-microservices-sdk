'use strict';

var config = require('./config.json').mongodb
var MongoClient = require('mongodb').MongoClient

//system.organizationCount
//system.organizations
//system.aspects

//wiki.organizations
//wiki.products

//organization.sentimentSnapshot = async (org) => total reviews/positive/negative
//organization.productCount
//organization.products
//organization.mostPositive(howmany, whattimeperiod) => URLList

//product.sentimentSnapshot() = async (org) => total reviews/positive/neutral/negative
//product.aspectSnapshot => total reviews/positive/negative per aspect


//aspect.getSentimentData(product, aspect)

exports.getDocumentCount = async (event, context, callback) => {
	var filter = event;
	context.callbackWaitsForEmptyEventLoop = false;
	let client = await MongoClient.connect(config.url, { useNewUrlParser: true });	
	let db = client.db(config.db);		
	var sentimentStats = {"positive": 0, "negative": 0, "reviews": 0};
	try{
		var coll = db.collection('sentiment');
		let results = await coll.find({"metadata.organization": filter.metadata.organization}).forEach(function(doc){
			console.log(doc.result);
		});
		client.close();
		//sentimentStats.reviews++;
		//let r = result.result;
		//console.log(r);
		//});		
		return sentimentStats;		
	}	
	finally{
		
	}
}



