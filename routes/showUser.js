var express = require('express');
var router = express.Router();

var User = require('../config/manageUser');

/* GET home page. */
router.get('/', function(req, res, next) {

    var userList = [];
    User.getAllUsers(function(err, users) {
        //console.log("in show user :" + users[0]);
        userList = users;
        console.log(userList);
        res.render('showUser', {
            title: 'Show User',
            userList: userList
        });
    });
});

module.exports = router;