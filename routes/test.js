var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('allTests', {
        'title': 'Тестирование'
    })
});/*
router.get('/create_test', function(req, res, next) {
    res.render('testCreation', {
        'title': 'Создание теста'
    })
});*/

module.exports = router;
