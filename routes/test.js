var express = require('express');
const mysql = require('../databases/connect');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('olympSelection', {
        'title': 'Тестирование'
    })
});
router.post('/checked/', (req, res, next) => {
    mysql.query("select * from");
    res.status(200).send(req.body);
});
router.get('/create/', function (req, res, next) {
    res.render('olympConstructor');
});
router.get('/walk', (req, res, next) => {
    res.render('olympWalkthrough');
});

module.exports = router;
