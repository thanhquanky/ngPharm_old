var mongoose = require('mongoose');

module.exports = function (app) {

    var VendorSchema = new mongoose.Schema({
        name: {type: String},                            	// lawful name of vendor
        nickname: {type: String},                       	// friendly name "so call"
        address: {type: String},							// address of vendor
        phone: {type: String},								// phone number
        fax: {type: String},								// fax number
        email: {type: String}								// email
    });

    return mongoose.model('Vendor', VendorSchema);
}
