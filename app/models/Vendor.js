var mongoose = require('mongoose');

module.exports = function (app) {

    var VendorSchema = new mongoose.Schema({
        name: {type: String},                            	// lawful name of vendor
        nickname: {type: String}                       	// friendly name "so call"
    });

    return mongoose.model('Vendor', VendorSchema);
}
