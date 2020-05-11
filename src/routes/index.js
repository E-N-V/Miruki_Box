var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", {
        title_page: "Miruki Box",
    });
});
router.get("/index", function (req, res, next) {
    res.render("index", {
        title_page: "Miruki Box",
    });
});
router.get("/index.*", function (req, res, next) {
    res.render("index", {
        title_page: "Miruki Box",
    });
});
router.get("/about", function (req, res, next) {
    res.render("about", {
        title_page: "Miruki Box",
    });
});

module.exports = router;
