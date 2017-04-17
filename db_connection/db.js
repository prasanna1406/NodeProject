// var express = require('express');
// var mysql = require('mysql');
// var router = express.Router();
//
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'root',
//   database : 'nodeProject'
// });
//
// connection.connect();
//
// // connection.query('SELECT * from user', function(err, rows, fields) {
// //   if (!err)
// //     console.log('The solution is: ', rows);
// //   else
// //     console.log('Error while performing Query.');
// // });
//
//
//
// var user = { name: 'Prasanna', email: 'prasanna.wagh14@gmail.com', password : 'prasa123', };
// connection.query('INSERT INTO user SET ?', user, function(err,res){
//   if(err) throw err;
//   console.log('Last insert ID:', res.insertId);
// });
//
// connection.end();
//
// module.exports = router;
