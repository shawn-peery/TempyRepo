var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/registration', function(req, res, next) {
  res.render('registration')
});

router.get('/forgot', function(req, res, next) {
  res.render('forgot')
});

router.post('/api/users', function(req, res, next) {
  const body = req.body;
  //console.log(body)
  console.log('req handled')
  res.render('registration')
});

module.exports = router;
