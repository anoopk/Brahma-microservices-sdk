const autoworld = require('./lib/autoworld')
const fs = require('fs');
var config = require('./config.json').mongodb

var event0 = {"metadata": {"organization": "Hyundai", "product": "i20"}};
var event1 = {"metadata": {"organization": "Hyundai", "product": "i10"}};
var event2 = {"metadata": {"organization": "maruti", "product": "wagonr"}};

autoworld.startup(config).then(function(aw){
	//aw.drop('Statistics');	
	
	aw.reviewCount().then(function(count, error){
		console.log("Total unique reviews ", count);		
	});

	aw.organisations.count(event1, config).then(function(count, error){
		console.log("Organizations  ", count);		
	});

	const org = "Maruti";	
	aw.products(org).then(function(count, error){
		console.log("Products ", count);		
	});

	//aw.products.count(event1, config).then(function(count, error){
	//	//console.log("Products ", count);		
	//});
	
	aw.organisations(event1, config).then(async function(orgs, error){
		console.log("Organizations ", orgs);
		orgs.map(org => aw.organisations.sentiments(org).then(function(sentiments){
			console.log(sentiments);
			aw.shutdown();
		}));		
	});
	
	//aw.organisations.sentiments(org).then(function(ss, error){
	//	console.log("Sentiment snapshot for ", org, ss);
	//	aw.shutdown();		
	//
});

