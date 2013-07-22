module.exports = function (app, Vendor) {
    var controller = {};

    controller.preSearch = [
        function (req, res, next) {
            console.log('this it?');
            req.query = (req.vendor && req.vendor.id) ? {vendorId: req.vendor.id} : {};
            req.Model = Vendor;
            next();
        }
    ]
    controller.preCreate = [
        function (req, res, next) {
            var keyword = req.params.name;
            Vendor.find({'name': keyword}, function(err, result) {
                if (err) return next(err);
                if (!result || result.length == 0) {
                    req.Model = Vendor;
                    next();
                }
                else {
                    console.log(result);
                    return res.send(400);
                }
            });
        }
    ]
    controller.preUpdate = [
        function (req, res, next) {
            //try to find a todo that matches the ID in the uri and belongs to the user who is logged i
            Todo.find({_id: req.params.id, vendorId: req.vendor.id}, function (err, results) {
                if (err) return next(err);
                if(!results) return res.send(401); 
                req.Model = Vendor;
                next();
            });
        }
    ]
    controller.preDestroy = [
        function (req, res, next) {
            //try to find a todo that matches the ID in the uri and belongs to the user who is logged in
            Vendor.find({_id: req.params.id, userId: req.vendor.id}, function (err, results) {
                if (err) return next(err);
                if(!results) return res.send(401); //trying to update a todo that isn't yours?!?!?!
                req.Model = Vendor;
                next();
            });
        }
    ]

    controller.getAll = [
        function (req, res, next) {
            req.Model = Vendor;
            next();
        }
    ]

    controller.preAutocomplete = [
        function (req, res, next) {
            /* search by either name or nickname
            i for case insensitive matching
            */
            var keyword = req.params.name;
            req.query = {
                $or: [
                    {name: {$regex: keyword, $options: 'i'}}, 
                    {nickname: {$regex: keyword, $options: 'i'}}
                ]
            };
            req.Model= Vendor;
            next();
        }
    ]

    return controller;
}
