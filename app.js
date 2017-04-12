var http = require('http');
var express = require('express');
var exehbs = require('express-handlebars');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var winston = require('winston');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

var page1 = require('./routes/page1');
var page2 = require('./routes/page2');
var signup = require('./routes/signup')
var users = require('./routes/users');
var quote = require('./routes/quote');
var news = require('./routes/news');

app.engine('handlebars', exehbs({defaultLayout: 'main'}));

// view engine setup
app.set('port', process.env.PORT || 8008);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.set('disablePage', true);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/page1', page1);
app.use('/page2', page2);
app.use('/signup', signup);
app.use('/users', users);
app.use('/quote', quote);
app.use('/news', news);

app.use(function(req, resp, next){
  var err = new Error('not found');
  err.status = 404;
  resp.render('error');
})

app.use('/', index);

http.createServer(app).listen(app.get('port'), function(){
  console.log("server has started");
  winston.info("winston is working");
})

process.on('uncaughtException', function (err) {
    winston.log('info', '-------------- UNCAUGHT EXCEPTION: ' + err);
    winston.log('info', '------------- ERROR STACK -------------');
    winston.log('info', err.stack);
    winston.log('info', '---------------------------------------');
});

module.exports = app;
