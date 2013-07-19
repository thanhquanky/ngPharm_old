var mongoose = require('mongoose');

module.exports = function (app) {

    var ItemSchema = new mongoose.Schema({
        name: {type: String},
        unit: {type: String},
        quantity: {type: Number},
        unitPrice: {type: Number},
        subTotal: {type: Number}
    });


    return mongoose.model('Item', ItemSchema);
}
