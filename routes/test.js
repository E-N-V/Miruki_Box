var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('olympSelection', {
        'title': 'Тестирование'
    })
});
router.get('/create', function (req,res,next) {
    res.render('olympConstructor.ejs')
});

module.exports = router;
