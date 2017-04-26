var http = require('http');
var express = require('express');
var exehbs = require('express-handlebars');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var winston = require('winston');
var session = require('express-session');
var expressValidator = require('express-validator');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var multer = require('multer');

var upload = multer({ dest: 'uploads/' });


winston.add(winston.transports.File, { filename: 'logfile.log' });
//winston.remove(winston.transports.Console);


//cron schedular using cron paackage
// var CronJob = require('cron').CronJob;
// new CronJob('0 0 * * * *', function() {
//
//   console.log('You will see this message every min');
// }, null, true, 'America/Los_Angeles');


// check for correct cron
// try {
//     new CronJob('0 * * * * *', function() {
//         console.log('this should not be printed');
//     })
// } catch(ex) {
//     console.log("cron pattern not valid");
// }

// var schedule = require('node-schedule');
//
// schedule.scheduleJob('0  * * * *', function(){
//   console.log('The answer to life, the universe, and everything!');
// });


var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

var index = require('./routes/index');
var page1 = require('./routes/page1');
var page2 = require('./routes/page2');
var signup = require('./routes/signup');
var login = require('./routes/login');
var users = require('./routes/users');
var quote = require('./routes/quote');
var news = require('./routes/news');
var assignment = require('./routes/assignment');
var showUser = require('./routes/showUser');
var cricapi = require('./routes/cricapi');

var User = require('./config/manageUser');



var dbconnection = require('./db_connection/db.js');

//require('./routes/routes')(app, passport);

app.engine('handlebars', exehbs({ defaultLayout: 'main' }));

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
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//Express session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));
//passport init
app.use(passport.initialize());
app.use(passport.session());



// In this example, the formParam value is going to get morphed into form body format useful for printing.
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

//connect flash
app.use(flash());

//Global Variables
app.use(function(req, res, next) {
    res.locals.user = req.user;
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});




/**
 * routes
 */
app.use('/', index);
app.use('/page1', page1);
app.use('/page2', page2);
app.use('/signup', signup);
app.use('/login', login);
app.use('/users', users);
app.use('/quote', quote);
app.use('/news', news);
app.use('/assignment', assignment);
app.use('/showUser', showUser);
app.use('/cricapi', cricapi);
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


app.use(function(req, resp, next) {
    var err = new Error('not found');
    err.status = 404;
    resp.render('error');
})


http.createServer(app).listen(app.get('port'), function() {
    console.log("server has started");
    winston.info("winston is working");
})

process.on('uncaughtException', function(err) {
    winston.log('info', '-------------- UNCAUGHT EXCEPTION: ' + err);
    winston.log('info', '------------- ERROR STACK -------------');
    winston.log('info', err.stack);
    winston.log('info', '---------------------------------------');
});

module.exports = app;