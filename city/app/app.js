
var index_map = require('./routes/index_map');
var NY_map = require('./routes/NY_map');
var closest = require('./routes/closest');
var closest_company = require('./routes/closest_company');


var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var dbConfig = require('./models/db');
var mongoose = require('mongoose');
// Connect to DB
mongoose.connect(dbConfig.url);

var correlation_search = require('./routes/correlation_search')
var correlation = require('./routes/correlation')

var mongodb_query_result = require('./routes/mongodb_query_result');
var mongodb_query = require('./routes/mongodb_query');

var PPAP = require('./routes/college_choice');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');
// TODO - Why Do we need this key ?
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

 // Using the flash middleware provided by connect-flash to store messages in session
 // and displaying in templates
var flash = require('connect-flash');
app.use(flash());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

var routes = require('./routes/index')(passport);
app.use('/', routes);

app.get('/index_map', index_map.do_work);
app.get('/New_York', NY_map.do_work);
app.get('/closest', closest.do_work);
app.get('/closest_company', closest_company.do_work);

/// catch 404 and forward to error handler
app.get('/correlation_search', correlation_search.do_work);
app.get('/correlation', correlation.do_work);


app.get('/mongodb_query', mongodb_query.do_work);
app.get('/mongodb_query_result', mongodb_query_result.do_work);
app.get('/college_choice', PPAP.do_work);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

module.exports = app;
