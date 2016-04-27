var express = require('express');
var router = express.Router();
var envconfig = require('../config/env');

/* GET home page. */
router.get('/', function(req, res) {
//  res.render('index', { title: 'Express' });
    res.json(envconfig);
});

module.exports = router;
