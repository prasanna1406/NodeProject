var express = require('express');
var router = express.Router();
var async = require('async');
var multer = require('multer');

var upload = multer({ dest: 'uploads/' });


var User = require('../config/manageUser');


// connection.connect();

router.get('/', function(req, res) {

    /**
     * Async Example
     */
    async.series([
        function(callback) {
            setTimeout(function() {
                console.log("Task 1");
                callback(null, 1, 4);
            }, 300);
        },
        function(callback) {
            setTimeout(function() {
                console.log("Task 2");
                callback(null, 2);
            }, 200);
        },
        function(callback) {
            setTimeout(function() {
                console.log("Task 3");
                callback(null, 3);
            }, 100);
        }
    ], function(error, results) {
        console.log((results[0])[0]);
    });

    res.render('signup', {
        header: 'this is header',
        title: 'registration',
        success: req.session.success,
        errors: req.session.errors
    });
    req.session.errors = null;
});

router.post('/registration', upload.single('profileImage'), function(req, res, next) {

    console.log("file name : " + req.file.filename);
    // Second way of validationErrors

    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var conPassword = req.body.password2;

    req.checkBody('name', 'Name is required').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        res.render('signup', {
            errors: errors
        });
    } else {
        console.log("PASSED");
        var user = { name: req.body.name, email: req.body.email, password: req.body.password };

        User.createUser(user, function(err, user) {
            if (err) throw err;
            console.log(user);
        })
        req.flash('success_msg', 'You are registered and now you can login');
        res.redirect('/login');
    }


    // connection.end();
});


module.exports = router;