var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(
    {
    user_id : '234567',
    name : 'prasanna',
  })
});

module.exports = router;
