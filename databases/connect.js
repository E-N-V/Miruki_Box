const mysql = require('mysql2');
const pool = mysql.createPool({
    connectionLimit: 5,
    host: "eu-cdbr-west-02.cleardb.net",
    user: "b40de03e5f6a2f",
    password: "4958d574",
    database: "heroku_cd281529c651890"
});

module.exports = pool;