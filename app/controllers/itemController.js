module.exports = function (app, Drug) {
    var controller = {};

    controller.preSearch = [
        function (req, res, next) {
            req.query = (req.user.id) ? {userId: req.user.id} : {};
            req.Model = Drug;
            next();
        }
    ]
    controller.preCreate = [
        function (req, res, next) {
            req.body.userId = req.user.id;
            req.Model = Drug;
            next();
        }
    ]
    controller.preUpdate = [
        function (req, res, next) {
            //try to find a Drug that matches the ID in the uri and belongs to the user who is logged i
            Drug.find({_id: req.params.id, userId: req.user.id}, function (err, results) {
                if (err) return next(err);
                if(!results) return res.send(401); //trying to update a Drug that isn't yours?!?!?!
                req.Model = Drug;
                next();
            });
        }
    ]
    controller.preDestroy = [
        function (req, res, next) {
            //try to find a Drug that matches the ID in the uri and belongs to the user who is logged in
            Drug.find({_id: req.params.id, userId: req.user.id}, function (err, results) {
                if (err) return next(err);
                if(!results) return res.send(401); //trying to update a Drug that isn't yours?!?!?!
                req.Model = Drug;
                next();
            });
        }
    ]
    controller.preAutocomplete = [
        function (req, res, next) {
            req.query = {name: {$regex: req.params.name, $options: 'i'}};
            req.Model = Drug;
            next();
        }
    ]

    return controller;
}
