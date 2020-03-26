const express = require('express');
const mysql = require('../databases/connect');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    mysql.query('select name, table_name, url from categories;', (err, data) => {
        if (err) return res.status(500).render('404/error');
        mysql.query('select name from name_categories;', (err, data_cat) => {
            if (err) return res.status(500).render('404/error');
            res.render('olympSelection', {
                data: data,
                data_cat: data_cat
            })
        });
    });
});
router.post('/checked/', (req, res, next) => {

    console.log(req.body);

    const quests = {
        olympCat: req.body.olympCat,
        answers: []
        };


    // for (let i = 0; i < req.body.counter; i++){
    //     const map = {
    //         type: req.body.questType_ + '' + i,
    //         text: req.body.questText_ + '' + i,
    //         any_source: req.body.opt_mode_ + '' + i,
    //         answers: req.body.answer_ + '' + i
    //     };
    //     quests.answers.push(map);
    // }

    //mysql.query("select * from");
    res.status(200).send(req.body);
});
router.get('/create/', function (req, res, next) {
    res.render('olympConstructor');
});

module.exports = router;
