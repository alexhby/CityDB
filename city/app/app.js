var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var index_map = require('./routes/index_map')
var NY_map = require('./routes/NY_map');

var correlation_search = require('./routes/correlation_search')
var correlation = require('./routes/correlation')

var mongodb_query_result = require('./routes/mongodb_query_result');
var mongodb_query = require('./routes/mongodb_query');

var PPAP = require('./routes/college_choice');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);


app.get('/index_map', index_map.do_work);
app.get('/New_York', NY_map.do_work);

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

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
