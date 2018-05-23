var http = require('http');
var express = require('express');
var path = require('path');
var methods = require('methods');
var cors = require('cors');
var passport = require('passport');
var errorhandler = require('errorhandler');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');

mongoose.plugin(schema => { schema.options.usePushEach = true });


var isProduction = process.env.NODE_ENV === 'production';

var app = express();

app.use(cors());

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));

app.use(session({ secret: 'tweeter', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

if (!isProduction) {
    app.use(errorhandler());
}
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/twitterCloneServer3');


require('./models/User');
require('./models/Article');
require('./models/Comment');
require('./config/passport');

app.use(require('./routes'));

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (!isProduction) {
    app.use(function(err, req, res, next) {
        console.log(err.stack);

        res.status(err.status || 500);

        res.json({
            'errors': {
                message: err.message,
                error: err
            }
        });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        'errors': {
            message: err.message,
            error: {}
        }
    });
});

var server = app.listen(process.env.PORT || 3000, function() {
    console.log('Listening on port ' + server.address().port);
});