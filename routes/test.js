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
});olympList
router.get('/create/fix', function (req, res, next) {
    const questions = req.body;
    console.log(questions);
    res.send(questions)
});
router.get('/walkthrough', (req, res, next) => {
    const olymp = req.query.olymp;
    mysql.query('', (err, data) => {

    });
    res.render('olympWalkthrough',{data: olymp});
});

module.exports = router;
