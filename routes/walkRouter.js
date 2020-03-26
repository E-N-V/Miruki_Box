const express = require('express');
const mysql = require('../databases/connect');
const router = express.Router();

/* GET home page. */
router.get('/:name', (req, res, next) => {
    const id_olymp = req.params.name;
    console.log(id_olymp);
    res.render('olympWalkthrough');
});

module.exports = router;
