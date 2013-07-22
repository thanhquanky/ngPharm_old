module.exports = function (app, Invoice, Vendor, Item) {
    var controller = {};

    controller.preSearch = [
        function (req, res, next) {
            console.log('this it?');
            req.query = (req.user.id) ? {userId: req.user.id} : {};
            req.Model = Invoice;
            next();
        }
    ]
    controller.preCreate = [
        function (req, res, next) {
            req.body.userId = req.user.id;
            Invoice.find({_id: req.params.id, userId: req.user.id}, function (err, results) {
                if (err) return next(err);
                if(!results) return res.send(401); //trying to update a Invoice that isn't yours?!?!?!
                req.Model = Invoice;
                next();
            });
        }
    ]
    controller.preUpdate = [
        function (req, res, next) {
            //try to find a Invoice that matches the ID in the uri and belongs to the user who is logged i
            Invoice.find({_id: req.params.id, userId: req.user.id}, function (err, results) {
                if (err) return next(err);
                if(!results) return res.send(401); //trying to update a Invoice that isn't yours?!?!?!
                req.Model = Invoice;
                next();
            });
        }
    ]
    controller.preDestroy = [
        function (req, res, next) {
            //try to find a Invoice that matches the ID in the uri and belongs to the user who is logged in
            Invoice.find({_id: req.params.id, userId: req.user.id}, function (err, results) {
                if (err) return next(err);
                if(!results) return res.send(401); //trying to update a Invoice that isn't yours?!?!?!
                req.Model = Invoice;
                next();
            });
        }
    ]

    controller.prePrint = [
        function (req, res, next) {
            //try to find a Invoice that matches the ID in the uri and belongs to the user who is logged in
            Invoice.find({_id: req.params.id, userId: req.user.id}, function (err, results) {
                if (err) return next(err);
                if(!results) return res.send(401); //trying to update a Invoice that isn't yours?!?!?!
                req.Model = Invoice;
                next();
            });
        }
    ]

    return controller;
}
