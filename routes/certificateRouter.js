var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //any function
    res.render('certificate');
});
router.get('/find/', (req,res,next) => {
    console.log(req.query.usr);
    res.status(200).send('<div> Hello </div>');
})

module.exports = router;
