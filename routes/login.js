var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../config/manageUser');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Login' });
});

passport.use(new LocalStrategy({
        passReqToCallback: true // don't forget this
    },
    function(req, username, password, done) {
        console.log("asdasd " + username);
        User.getUserByEmail(username, function(err, user) {
            console.log("user : " + user);
            if (err) throw err;
            if (!user) {
                return done(null, false, req.flash('error_msg', 'Unknown User'));
            } else {
                if (user.password == password) {
                    return done(null, user);
                } else {
                    return done(null, false, req.flash('error_msg', 'Wrong password'));
                }
            }
        });
    }
));

passport.serializeUser(function(user, done) {
    console.log("in serializeUser");
    done(null, user);
});

// passport.deserializeUser(function(id, done) {
//     console.log("AS");
//     User.getUserById(id, function(err, user) {
//         done(err, user);
//     });
// });

router.post('/dologin', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }),
    function(req, res) {
        res.redirect('/');
    });




module.exports = router;