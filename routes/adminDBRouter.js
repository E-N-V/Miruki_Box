var express = require('express');
const eAdmin = require('express-admin');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('dbViews');
    const tests = require('../databases/connect');
});

module.exports = router;