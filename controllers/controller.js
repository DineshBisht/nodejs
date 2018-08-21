var express   = require('express');
var userModel = require("../models/user.model");
var registerForm = {
    "full_name":'',
    "email":'',
    "password":'',
    "mobile":''
};
exports.register = function(req,res){
    var error_messages = req.flash("error");
    res.render("register.ejs",{title:'Register',"error_message":error_messages,"form":registerForm});
}
exports.login = function(req,res){
    var error_messages = req.flash("error");
    res.render("login.ejs",{title:'login',"error_message":error_messages});
}
exports.createUser = function(req,res){
    req.checkBody("full_name","User name cannot be blank").notEmpty();
    req.checkBody("email","Email cannot be blank").notEmpty();
    if(req.body['email'] != '' ){
        req.checkBody("email","Invalid email id").isEmail();
    }
    req.checkBody("password","Password cannot be blank").notEmpty();
    if ( req.body["password"] != '' ){
        req.checkBody("password","Password cannot be less then 6 charecter").isLength({min:6});
    }
    
    req.checkBody("mobile","Mobile cannot be blank").notEmpty();
    if ( req.body['mobile'] != '' ){
        req.checkBody('mobile',"mobile length cannot be less then 10 chacrecter").isLength({min:10});
    }

    if( req.validationErrors() ){
        var messages = [];
        req.validationErrors().forEach((error)=>{
            messages.push(error.msg);
        });
        req.flash("error",messages);
        registerForm.full_name = req.body['full_name'];
        registerForm.email = req.body['email'];
        registerForm.password = req.body['password'];
        registerForm.mobile = req.body['mobile'];
        res.redirect("/register")
    }
    
    var inserted_user = {
        "name"      :req.body['full_name'],
        "email"     :req.body['email'],
        "password"  :req.body['password'],
        "mobile"    :req.body['mobile'],
        "gender"    :req.body['gender'],
        
    }
    userModel.createUser(inserted_user)
             .then(function(data){
                 res.redirect("/login");
             })
             .catch(function(error){
                 console.log(error.message);
                 //res.redirect("/register");
             });
}

exports.userList = function(req,res){
    userModel.getUsers()
             .then(function(users){
                 console.log(users);
             })
             .catch(function(error){
                 console.log(error);
             });
    res.render("login",{title:'Login'});
}

exports.deleteAllUsers = function(req,res){
    userModel.deleteAllUsers()
             .then((users)=>{
                 console.log("Deleted");
             })
             .catch((err)=>{
                 console.log(err);
             });
}

exports.signIn = function(req,res){
    req.checkBody("email","Email cannot be blank").notEmpty();
    if(req.body['email']!='')
        req.checkBody("email","Invalid email").isEmail();

    req.checkBody("password","Password cannot be blank").notEmpty();
    if(req.body['password']!='')
        req.checkBody("password","Password length cannot be less then 6 cherecter").isLength({min:6});

    var errors = req.validationErrors();
    if ( errors ){
        var messages = [];
        errors.forEach(error => {
            messages.push(error.msg);
        });
        req.flash("error",messages);
        res.redirect("/login");
    }
    userModel.login(req.body['email'],req.body['password'])
        .then(function(user){
            var session = req.session;
            session.loggedIn = true;
            session.userInfo = user;
            res.redirect("/dashboard");
        },function(err){
            req.flash("error",err);
            res.redirect("/login");
        });
        
}
exports.logout = function(req,res){
    req.session.destroy(function(err){
        res.redirect("/login");
      });
}


