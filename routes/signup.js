var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');

router.get('/', function(req, res){
    res.render('signup', {
        header  : 'this is header'
    });
});

router.post('/registration', function(req, res){

    // var name = req.body.name;
    // var password = req.body.password;
    // var email = req.body.email;
    console.log("reached");
    res.json({
      name : req.body.name,
      password : req.body.password,
      email : req.body.email
    });

    // res.render('signup', {
    //     header  : 'this is header'
    // });
});

// router.post('/add', function(req, res){
//   res.end('add post');
// });



module.exports = router;
