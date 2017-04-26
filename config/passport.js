var express = require('express');
var router = express.Router();

var LocalStrategy = require('passport-local').Strategy;

var User = require('../config/manageUser');

module.exports = function(passport) {
    passport.use('local-login', new LocalStrategy({
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
        console.log("in serializeUser : " + user.id);
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        console.log("\n\ndeserializeUser\n\n");
        User.getUserById(id, function(err, user) {
            console.log(user);
            done(err, user);
        });
    });
}