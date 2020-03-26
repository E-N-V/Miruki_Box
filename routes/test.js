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
    //{"olympCat":"arch","questType0":"radio","questText0":"сопс","opt-mode0":"nothing","answer00":"орлрп","answer10":"ол","answer20":"аргш","radios0":"2","answer30":"ншгн","questType1":"checkbox","questText1":"негрег","opt-mode1":"nothing","answer01":"шнгш","checkBoxes1":["0","2","3"],"answer11":"егн","answer21":"567ен","answer31":"758786","answer41":"56756","questType2":"radio","questText2":"плриыа","opt-mode2":"nothing","answer02":"еыркеап","answer12":"олдрощд","answer22":"гшщгн","radios2":"2","answer32":"рол","answer42":"ывау","answer52":"аегшрп","answer62":"шнгшн","questType3":"radio","questText3":"яврпвар","opt-mode3":"nothing","answer03":"апрванео","answer13":"некгнге","answer23":"пырпр","answer33":"гнеугер","radios3":"3","answer43":"уенкен","questType4":"checkbox","questText4":"ыекнапро","opt-mode4":"code","answer04":"asd","answer14":"erwer","answer24":"heello","checkBoxes4":"2","answer34":"qweq","answer44":"erwr","questType5":"textbox","questText5":"dzhgzfhsfghfdgh6tj","opt-mode5":"nothing","answer5":"fghdfghjrj","questType6":"radio","questText6":"shrtsfhgh","opt-mode6":"nothing","answer06":"dytjdtyj","answer16":"yurtyu","answer26":"trufgj","radios6":"2","answer36":"yutyurt"}
    //mysql.query("select * from");
    res.status(200).send(req.body);
});
router.get('/create/', function (req, res, next) {
    res.render('olympConstructor');
});

module.exports = router;
