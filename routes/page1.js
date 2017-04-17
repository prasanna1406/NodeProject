var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('page1', {
        header: 'this is header'
    });
});

router.get('/user/:userId', function(req, res) {
    var userId = req.params.userId;
    res.render('page1', {
        layout: 'main',
        header: 'this is user Id : ' + userId
    });
});

// router.get('/user', function(req, res){
//     res.render('page1', {
//       layout : 'main',
//         header  : 'You can add user here'
//     });
// });

router.get('/user', function(req, res) {
    var userId = req.query.userid;
    var name = req.query.name;
    console.log(name);
    if (userId == undefined || name == undefined) {
        res.render('error');
        return;
    } else {
        res.render('page1', {
            user_id: userId,
            name: name,
        })
    }

})

module.exports = router;