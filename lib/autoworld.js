'use strict';
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

async function getEntities(key, context){
	var entities = {};
	let client = await MongoClient.connect(context.url, { useNewUrlParser: true });	
	let db = client.db(context.db);		
	try{
		var coll = db.collection('sentiment');
		let entities = await coll.distinct(key);
		client.close();						
		return entities;
	}	
	finally{		
		client.close();	
	}	
}

async function getEntityCount(key, context){
	let entities = await getEntities(key, context);
	return entities.length;
}

exports.reviewCount = async (event, context, callback) => {
	return await getEntityCount('metadata.url', context);	
}

exports.products = async (event, context, callback) => {
	return await getEntities('metadata.product', context);
}

exports.organisations = async (event, context, callback) => {
	return await getEntities('metadata.organization', context);
}

exports.organisationCount = async (event, context, callback) => {
	return await getEntityCount('metadata.organization', context);
}

exports.productCount = async (event, context, callback) => {
	return await getEntityCount('metadata.product', context);
}

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



