var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../config/manageUser');
require('../config/passport')(passport);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Login' });
});

// router.post('/dologin', passport.authenticate('local', {
//         successRedirect: '/',
//         failureRedirect: '/login',
//         failureFlash: true
//     }),
//     function(req, res) {

//         req.login(user.id, function(err) {

//             res.redirect('/');

//         })

//     }
// );

// router.post('/dologin', function handleLocalAuthentication(req, res, next) {

//     passport.authenticate('local', function(err, user, info) {
//         if (err) return next(err);
//         if (!user) {
//             return res.json(403, {
//                 message: "no user found"
//             });
//         }

//         // Manually establish the session...
//         req.login(user, function(err) {
//             console.log("in login " + user.id);
//             if (err) return next(err);
//             res.redirect('/');
//         });

//     })(req, res, next);
// });

router.post('/dologin', passport.authenticate('local-login', {
    successRedirect: '/', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));




module.exports = router;