const express = require('express');
const router = express.Router();
const path = require('path');
/* GET home page. */
router.use(express.static('../nodeDemo/static/build'));
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.sendFile(path.resolve('../nodeDemo/static/build/index.html'));
});

module.exports = router;
