var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('page2', {
        layout : 'layout2',
        header : 'This is header for layout 2'
    });
});

module.exports = router;