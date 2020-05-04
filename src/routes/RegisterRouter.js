var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
	//any function
	res.render("register", {
		title_page: "Регистрация",
	});
});

module.exports = router;
