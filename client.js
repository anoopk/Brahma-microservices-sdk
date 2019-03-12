const sdk = require('./index')
const fs = require('fs');

var event = {"metadata": {"organization": "maruti", "product": "wagonr"}};
sdk.handler(event, {}).then(function(status, error){
	console.log("Gotcha ", status);
});