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
    res.render('olympConstructor.ejs')
});
router.get('/olympList/create/test', (req, res, next) => {
    console.log(req.body);
    res.send(req.body);
});
router.get('/walkthrough', (req, res, next) => {
    const olymp = req.query.olymp;
    res.render('olympWalkthrough',{data: olymp});
});

module.exports = router;
