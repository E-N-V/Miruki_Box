var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    //any function
    res.render("login", {
        title_page: "Авторизация",
    });
});

module.exports = router;
