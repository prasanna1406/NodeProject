var express = require('express');
var router = express.Router();

var request = require('request');

var routes = require('../routes/routes');

router.get('/', routes.isLoggedIn, myfunction);


function myfunction(req, res) {
    res.render('quote', {
        title: 'Quote'
    });
}

router.post('/new', routes.isLoggedIn, function(req, res) {
    var options = {
        method: 'POST',
        url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=movies',
        headers: {
            'X-Mashape-Key': process.env.XMASHAPEKEY || 'Wz5nfbQnxSmshER9OVSIWfXvdHWmp1CTXIUjsntop4Pu5mQdNE',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    };
    request(options, callback_get_quote);

    function callback_get_quote(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(JSON.stringify(body));
        }
    }
});
module.exports = router;