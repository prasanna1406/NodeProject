var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'nodeProject'
});

// connection.connect();

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
    // connection.connect();
    var user = { name: req.body.name, email: req.body.email, password : req.body.password};
    connection.query('INSERT INTO user SET ?', user, function(err,res){
      if(err) throw err;
      console.log('Last insert ID:', res.insertId);
    });

    // connection.end();
    res.redirect('/signup');
    // res.json({
    //   name : req.body.name,
    //   password : req.body.password,
    //   email : req.body.email
    // });

    // res.render('signup', {
    //     header  : 'this is header'
    // });
});

// router.post('/add', function(req, res){
//   res.end('add post');
// });



module.exports = router;
