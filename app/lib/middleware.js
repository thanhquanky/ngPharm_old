var express = require('express'),
    MongoStore = require('connect-mongo')(express),
    connect_timeout = require('connect-timeout'),
    engine = require('express-hbs');


// Middleware

module.exports = function (app, config, passportMiddleware ) {

    // Sessions
    var mongoStore = new MongoStore({
        url: config.mongodb.uri
    });

    var session_middleware = express.session({
        key:config.session.key,
        secret: config.session.secret,
        store:mongoStore
    });

    // Error handler
    var error_middleware = express.errorHandler({
        dumpExceptions:true,
        showStack:true
    });


    // Middleware stack for all requests
    app.use(express['static'](app.set('public')));                      // static files in /public
    app.use(connect_timeout({ time:config.request_timeout }));   // request timeouts
    app.use(express.cookieParser());                                    // req.cookies
    app.use(session_middleware);                                        // req.session
    app.use(express.bodyParser());                                      // req.body & req.files
    app.use(express.methodOverride());                                  // '_method' property in body (POST -> DELETE / PUT)
    app.use(passportMiddleware.initialize());
    app.use(passportMiddleware.session());
    app.use(passportMiddleware.setLocals);

    app.all('/*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        next();
    });
    app.use(app.router);                                                // routes in lib/routes.js

    // Handle errors thrown from middleware/routes
    app.use(error_middleware);

    app.configure('development', function(){
        app.set('helpers', engine.handlebars.helpers);
        var helpers = require('express-hbs-helpers').helpers;
        helpers(app, engine);
        engine.registerHelper('list', function(text, options) {
            var ret = '';
            for (var i= 0, j=text.length; i<j; i++) {
                ret = ret + '<tr>' + options.fn(text[i]) + '</tr>';
            }
            return ret;
        });
        require('express-trace')(app);
    });
};
