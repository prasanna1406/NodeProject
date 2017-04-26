var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', isLoggedIn, function(req, res) {

    var sources = [];
    var options = {
        url: 'https://newsapi.org/v1/sources?language=en'
    }

    request(options, callbackNewsSource);


    function callbackNewsSource(error, response, body) {
        if (!error && response.statusCode == 200) {
            var resp = JSON.parse(body);
            sources = resp.sources;
            // for (var i = 0; i < resp.sources.length; i++) {
            //   sources.push(resp.sources[i]);
            // }
            res.render('news', {
                title: 'news',
                sources: sources
            });
        }
    }
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        //if user is looged in, req.isAuthenticated() will return true 
        next();
        console.log("user in session");
    } else {
        console.log("user not in session");
        res.redirect("/login");
    }
}

// router.get('/getsources', getListOfSources);

// function getListOfSources(req, res) {

//     var options = {
//         url: 'https://newsapi.org/v1/sources?language=en'
//     }

//     request(options, callbackNewsSources);

//     function callbackNewsSources(error, response, body) {
//         //console.log(JSON.stringify(body));
//         if (!error && response.statusCode == 200) {
//             //res.send(JSON.stringify(body));
//             res.send(JSON.stringify(body))
//         }

//     }
// }

router.post('/getnewsbysouces', getListOfNews);

function getListOfNews(req, res) {

    console.log(req.body.source);

    var newsApiKey = process.env.NEWSAPIKEY || 'fd97fccd2fa14e42860647110afc8bf9';
    var link = 'https://newsapi.org/v1/articles?source=' + req.body.source + '&apiKey=' + newsApiKey;
    var options = {
        url: link
    }

    request(options, callbackNews);

    function callbackNews(error, response, body) {
        //console.log(JSON.stringify(body));
        if (!error && response.statusCode == 200) {
            //res.send(JSON.stringify(body));
            res.send(JSON.stringify(body));
        }

    }
}


module.exports = router;