var express = require('express');
const mysql = require('../databases/connect');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('olympSelection', {
        'title': 'Тестирование'
    })
});
router.get('/create', function (req, res, next) {
    if (!req.body.name) {
        res.render('olympConstructor.ejs')
    }else {
        console.log(req.body);
        res.send(req.body);
    }
});
router.get('/walk', (req, res, next) => {
    res.render('olympWalkthrough');
});

module.exports = router;
