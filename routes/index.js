var express = require('express');
var router = express.Router();

/* GET home page. */
let requiresLogin = function(req, res, next) {
  if (! req.session.loggedIn) {
    res.redirect("/login");
  }
  res.locals.userinfo =  req.session.userInfo;
  return next();
};

const indexController = require("../controllers/controller");
router.get('/', indexController.userList);

router.get("/login",indexController.login);
router.post('/login',indexController.signIn );
router.get('/register',indexController.register );
router.post('/register',indexController.createUser );
router.get("/dashboard",requiresLogin,function(req,res){
  res.render("dashboard");
});
router.get('/logout',indexController.logout)


module.exports = router;
