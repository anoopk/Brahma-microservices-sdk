'use strict';
var MongoClient = require('mongodb').MongoClient

//autoworld.aspects

//wiki.organizations
//wiki.products

//organization.sentimentSnapshot = async (org) => total reviews/positive/negative
//product.sentimentSnapshot() = async (org) => total reviews/positive/neutral/negative
//product.aspectSnapshot => total reviews/positive/negative per aspect

async function getEntities(client, key){
	var entities = {};
	
	let db = client.db("Statistics");		
	try{
		var coll = db.collection('sentiment');
		let entities = await coll.distinct(key);
		//client.close();						
		return entities;
	}	
	finally{		
		client.close();	
	}	
}

async function getEntityCount(client, key){
	let entities = await getEntities(client, key);
	return entities.length;
}

var client = {};

client.reviewCount = async (filter) => {
	return await getEntityCount(client.connection, 'metadata.url');	
}

client.products = async (filter) => {
	return await getEntities(client.connection, 'metadata.product');
}

client.organisations = async (filter) => {
	return await getEntities(client.connection, 'metadata.organization');
}

client.organisations.count = async (filter) => {
	return await getEntityCount(client.connection, 'metadata.organization');
}

client.products.count = async (filter) => {
	return await getEntityCount(client.connection, 'metadata.product');
}

client.shutdown = async (filter) => {
	client.connection.close();
}

exports.startup = async (context) => {
		let connection = await MongoClient.connect(context.url, { useNewUrlParser: true });
		console.log("Autoworld connection established");
		client.connection = connection;
		client.db  = context.db;
		return client; 
}




