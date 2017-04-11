var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  //fetch info
  res.json(
    {
    user_id : '1234',
    name : 'prasanna',
  })
});

module.exports = router;
