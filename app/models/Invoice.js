var mongoose = require('mongoose');

module.exports = function (app, Item) {

	var ItemSchema = new mongoose.Schema({
        name: {type: String},
        unit: {type: String},
        quantity: {type: Number},
        unitPrice: {type: Number},
        subTotal: {type: Number}
    });
    
    var InvoiceSchema = new mongoose.Schema({
    	userId: {type: mongoose.Schema.Types.ObjectId},
        number: {type: String},                            
        vendorId: {type: mongoose.Schema.Types.ObjectId},
        date: {type: Date, default: Date.now()},
        type: {type: String},
        items: [ItemSchema],
        subtotal: {type: Number},
        taxPercent: {type: Number},
        tax: {type: Number},
        total: {type: Number}
    });

    return mongoose.model('Invoice', InvoiceSchema);
}
