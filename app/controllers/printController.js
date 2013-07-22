var mongoose = require('mongoose');

var Schema = mongoose.Schema;

module.exports = function (app, Invoice) {
    var controller = {};

    controller.print = [
        function (req, res, next) {
            var id = req.params.id;
            Invoice.findById(id, function(err, doc) {
                if (err) return next(err);
                if (doc) {
                    console.log(doc);
                    res.render(app.set('public') + '/printInvoice.hbs', doc);
                }
                else {
                    console.log("not found");
                    res.send("Not found");
                }
            });
        }
    ];
    return controller;
}