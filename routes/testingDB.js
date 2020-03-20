var express = require('express');
const mySql = require('mysql2');
var router = express.Router();

const pool = mySql.createPool({
    connectionLimit: 5,
    host: "eu-cdbr-west-02.cleardb.net",
    user: "b40de03e5f6a2f",
    password: "4958d574",
    database: "heroku_cd281529c651890"
});

/* GET home page. */
router.get('/', function(req, res, next) {
    //any function
    pool.query('select * from users;', (err, data) => {
        if (err) throw res.send(err);
        res.render('testingDB', {
            users: data
        })
    });
});

module.exports = router;
