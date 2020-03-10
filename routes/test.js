var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('allTests', {
        'title': 'Тестирование'
    })
});
router.get('/create', function (req,res,next) {
    res.render('olympConstructor.ejs')
});
router.get('/create/fix', function (req,res,next) {
    res.render('fixOlymp.ejs')
});

module.exports = router;
