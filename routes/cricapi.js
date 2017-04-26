var express = require('express');
var router = express.Router();
var cricapi = require("node-cricapi");
var request = require('request');
var async = require('async');

/* GET cric info page. */
router.get('/', function(req, res, next) {

    var liveMatches = [];
    var upcomingMatches = [];
    var espnCricNews = [];
    var recentLiveMatches = [];
    var oldMatches = [];
    async.series([
            function(callback) {
                var options = {

                    method: "get",
                    url: 'http://cricapi.com/api/matches/?apikey=Hx85ha4pD8OSok64j16H6PVAs693',
                }

                request(options, function(error, response, body) {
                        if (!error) {
                            var resp = JSON.parse(body);
                            //console.log(resp.matches);
                            var matches = resp.matches
                            for (var i = 0; i < 10; i++) {
                                if (matches[i].matchStarted) {
                                    liveMatches.push(matches[i]);
                                } else {
                                    upcomingMatches.push(matches[i])
                                }
                            }
                            callback(null, liveMatches, upcomingMatches)
                        }
                    })
                    //callback();
            },
            function(callback) {

                if (liveMatches.length) {
                    var options = {
                        method: "get",
                        url: 'http://cricapi.com/api/cricketScore/?apikey=Hx85ha4pD8OSok64j16H6PVAs693&&unique_id=' + liveMatches[0].unique_id,
                    }

                    request(options, function(error, response, body) {
                        if (!error) {
                            var resp = JSON.parse(body);
                            //console.log(resp);
                            recentLiveMatches.push(resp);
                            callback(null, recentLiveMatches);
                        }
                    });
                } else {
                    callback(null, recentLiveMatches);
                }
            },
            function(callback) {
                var newsApiKey = process.env.NEWSAPIKEY || 'fd97fccd2fa14e42860647110afc8bf9';
                var link = 'https://newsapi.org/v1/articles?source=espn-cric-info&apiKey=' + newsApiKey;
                var options = {
                    url: link
                }

                request(options, callbackNews);

                function callbackNews(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var resp = JSON.parse(body);
                        espnCricNews = resp.articles
                        callback(null, espnCricNews);
                    }
                }
            },
            function(callback) {
                var options = {
                    method: "get",
                    url: 'http://cricapi.com/api/cricket/?apikey=Hx85ha4pD8OSok64j16H6PVAs693',
                }

                request(options, function(error, response, body) {
                    if (!error) {
                        var resp = JSON.parse(body);
                        console.log(resp.data);
                        oldMatches = resp.data;
                        callback(null, oldMatches);
                    }
                });
            }
        ],
        function(err, results) {
            res.render('cricapi', {
                title: 'Cric Info',
                upcomingMatches: (results[0])[1],
                recentLiveMatches: results[1],
                espnCricNews: results[2],
                oldMatches: oldMatches
            });
        }
    );
});

module.exports = router;