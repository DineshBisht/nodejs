var express = require("express");
var router  = express.Router();
var categoryController  = require("../controllers/category_controller");
let requiresLogin = function(req, res, next) {
    if (! req.session.loggedIn) {
      res.redirect("/login");
      //next(err);
    }
    res.locals.userinfo =  req.session.userInfo;
    return next();
};

router.get("/",requiresLogin,categoryController.category);
router.get("/create",requiresLogin,categoryController.categoryForm);
router.post("/create",requiresLogin,categoryController.create);


module.exports = router;