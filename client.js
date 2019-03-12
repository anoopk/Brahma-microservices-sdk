const sdk = require('./index')
const fs = require('fs');

var event0 = {"metadata": {"organization": "Hyundai", "product": "i20"}};
var event1 = {"metadata": {"organization": "Hyundai", "product": "i10"}};
var event2 = {"metadata": {"organization": "maruti", "product": "wagonr"}};
sdk.getDocumentCount(event1, {}).then(function(status, error){
	console.log("Gotcha");		
});

