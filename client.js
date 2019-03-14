const autoworld = require('./lib/autoworld')
const fs = require('fs');
var config = require('./config.json').mongodb

var event0 = {"metadata": {"organization": "Hyundai", "product": "i20"}};
var event1 = {"metadata": {"organization": "Hyundai", "product": "i10"}};
var event2 = {"metadata": {"organization": "maruti", "product": "wagonr"}};

autoworld.startup(config).then(function(aw){
	aw.reviewCount({}).then(function(count, error){
		console.log("Total reviews ", count);		
	});
	aw.organisations(event1, config).then(function(count, error){
		console.log("Organizations ", count);		                      
	});
	aw.organisations.sentiments().then(function(ss, error){
		console.log("Organizations sentiments", ss);
		aw.shutdown();		
	});
	return;
	
	aw.organisations.count(event1, config).then(function(count, error){
		console.log("Organization count ", count);		
	});

	aw.products(event1, config).then(function(count, error){
		console.log("Products ", count);		
	});

	aw.products.count(event1, config).then(function(count, error){
		console.log("Product count ", count);		
	});
	
	aw.shutdown();						
});
