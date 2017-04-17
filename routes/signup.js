var express = require('express');
var router = express.Router();



var User = require('../config/manageUser');


// connection.connect();

router.get('/', function(req, res){

      res.render('signup', {
          header  : 'this is header',
          title : 'registration',
          success : req.session.success,
          errors : req.session.errors
      });
      req.session.errors = null;
});

router.post('/registration', function(req, res, next){


  //First Way of validations
    // req.check('email', 'Invalid email address').isEmail();
    // //req.check('name', 'Enter name').isAlpha(;
    // req.check('password', 'Invalid password').isLength({min:4});
    //
    // var errors = req.validationErrors();
    // if(errors) {
    //   req.session.errors = errors;
    //   req.session.success = false;
    // } else {
    //   req.session.success = true;
    //   var user = { name: req.body.name, email: req.body.email, password : req.body.password};
    //   connection.query('INSERT INTO user SET ?', user, function(err,res){
    //     if(err) throw err;
    //     console.log('Last insert ID:', res.insertId);
    //   });
    //   res.redirect('/signup');
    // }
    // connection.connect();

    // Second way of validationErrors

    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var conPassword = req.body.password2;

    req.checkBody('name', 'Name is required').notEmpty();

    var errors = req.validationErrors();

    if(errors){
      res.render('signup', {
          errors : errors
      });
    }else{
      console.log("PASSED");
        var user = { name: req.body.name, email: req.body.email, password : req.body.password};

        User.createUser(user, function (err, user) {
          if(err) throw err;
          console.log(user);
        })
        req.flash('success_msg', 'You are registered and now you can login');
        res.redirect('/login');
    }


    // connection.end();
});


module.exports = router;
