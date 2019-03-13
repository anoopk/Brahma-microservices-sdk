const autoworld = require('./lib/autoworld')
const fs = require('fs');
var config = require('./config.json').mongodb

var event0 = {"metadata": {"organization": "Hyundai", "product": "i20"}};
var event1 = {"metadata": {"organization": "Hyundai", "product": "i10"}};
var event2 = {"metadata": {"organization": "maruti", "product": "wagonr"}};

autoworld.reviewCount(event1, config).then(function(count, error){
	console.log("Total reviews ", count);		
});

autoworld.organisations(event1, config).then(function(count, error){
	console.log("Organizations ", count);		
});

autoworld.organisationCount(event1, config).then(function(count, error){
	console.log("Organization count ", count);		
});

autoworld.products(event1, config).then(function(count, error){
	console.log("Products ", count);		
});

autoworld.productCount(event1, config).then(function(count, error){
	console.log("Product count ", count);		
});

