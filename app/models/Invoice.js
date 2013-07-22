var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = function (app, Item, Vendor) {

	var ItemSchema = new Schema({
        name: {type: String},
        unit: {type: String},
        quantity: {type: Number},
        unitPrice: {type: Number},
        subTotal: {type: Number}
    });

    var VendorSchema = new Schema({
        name: {type: String},                            	// lawful name of vendor
        nickname: {type: String}                       	// friendly name "so call"
    });

    var InvoiceSchema = new Schema({
    	userId: {type: Schema.Types.ObjectId},
        number: {type: String},
        vendor: {type: String},
        date: {type: Date, default: Date.now()},
        type: {type: String},
        items: [ItemSchema],
        subtotal: {type: Number},
        taxPercent: {type: Number},
        tax: {type: Number},
        total: {type: Number}
    });
    /*
    InvoiceSchema.virtual('vendor')
        .set(function(name) {
            console.log('Looking for vendor id of ' + name);
            var that = this;
            Vendor.findOne({name: name}, function(err, doc) {
                if (err) return next(err);
                if (doc) {
                    console.log('setting id to ' + doc._id);
                    that.vendorId = doc._id;
                    that.save();
                }
            });
        })
        .get(function() {
            var that = this;
            Vendor.find({_id: that.vendorId}, function(err, docs) {
                if (err) return next(err);
                if (docs) {
                    return docs.name;
                }
            })
        });
    */

    return mongoose.model('Invoice', InvoiceSchema);
}
