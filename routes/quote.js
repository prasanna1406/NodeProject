var express = require('express');
var router = express.Router();

var request = require('request');

router.get('/', myfunction);

function myfunction(req, res) {
  res.render('quote', {
    title : 'Quote'
  });
}

router.post('/new', function(req, res) {
  var options = {
        method : 'POST',
        url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=movies',
        headers: {
        'X-Mashape-Key': 'Wz5nfbQnxSmshER9OVSIWfXvdHWmp1CTXIUjsntop4Pu5mQdNE',
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Accept' : 'application/json'
        }
    };
    request(options, function (error, response, body) {
      //console.log(JSON.stringify(body));
      if(!error && response.statusCode == 200) {
        res.send(JSON.stringify(body));
      }
    });
});
module.exports = router;
