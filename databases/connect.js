const orm = require('orm');
const mysql = require('mysql2');

orm.connect(process.env.CLEARDB_DATABASE_URL, function (err, db) {
  if (err) throw err;
  console.log('Connect successfull');
});