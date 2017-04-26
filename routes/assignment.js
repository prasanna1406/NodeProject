var express = require('express');
var router = express.Router();

var routes = require('../routes/routes');
/* GET home page. */
router.get('/', routes.isLoggedIn, function(req, res, next) {

    var byFrequency = req.query.valid;
    res.render('assignment', {
        title: 'Assignment',
        byFrequency: byFrequency,
    });
});

router.post('/showSelectedScedule', showResult);

function showResult(req, res, next) {

    var selected = JSON.parse(req.body.selected);
    console.log(selected[0]);
};

router.post('/showResult', function(req, res, next) {

    var options = req.body.options;
    var slots = [];
    var byFrequency = false;
    var byTimeSlot = false;
    var errors;
    if (options != 'byFrequency') {
        var timeslots = req.body.timeSlot;

        req.check('timeSlot', 'Please select atleast one timeslot').notEmpty();
        errors = req.validationErrors();
        if (!errors) {
            if (timeslots.length < 9) {
                for (var i = 0; i < timeslots.length; i++) {
                    slots.push(timeslots[i]);
                }
            } else {
                slots.push(timeslots);
            }
        }
        byTimeSlot = true;
        if (errors) {
            req.flash('error_msg', 'Please select atleast one timeslot');
            res.redirect('/assignment');
        }
    } else {
        var frequency = req.body.frequency;
        var period = req.body.period;

        req.check('frequency', 'Frequency is required').notEmpty();
        req.check('period', 'Period is required').notEmpty();

        errors = req.validationErrors();
        if (!errors) {
            slots.push(frequency);
            slots.push(period);
        }
        byFrequency = true;
        if (errors) {
            req.flash('error_msg', 'Frequency is required');
            res.redirect('/assignment/?valid=' + encodeURIComponent(byFrequency))
        }
    }

    if (!errors) {
        res.render('result', {
            title: 'Result',
            showResult: true,
            byFrequency: byFrequency,
            byTimeSlot: byTimeSlot,
            selectedOption: options,
            slots: slots
        });
    }
});


module.exports = router;