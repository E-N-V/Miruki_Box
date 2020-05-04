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
    pool.query('show tables;;', (err, show_table) => {
        pool.query('select * from name_categories, categories', (err, tables) => {
            if (err) throw res.send(err);
            res.status('200').render(`testingDB`, {
                sTable: show_table,
                iTable: tables
            })
        });
    });
});

module.exports = router;
