var express       = require("express");
var categoryModel = require("../models/category/category.model");

exports.category = function(req,res){
    categoryModel.getCategory()
                .then(function(data){
                    res.render("category/category",{title:"Category","category_list":data});
                })
                .catch(function(err){
                    res.send("Error "+err);
                });
    
}

exports.categoryForm = function(req,res){
    var error_messages = req.flash("error");
    categoryModel.getCategory()
        .then(function(data){
            res.render("category/create",{"categories":data,"error_messages":error_messages});
        });
    
}

exports.create = function(req,res){
    
    req.checkBody("category_name","Please enter category name").notEmpty();
    
    if ( req.validationErrors() ){
        req.flash("error","Please enter category name");
        res.redirect("/category/create");
    }
    var data = {"name":req.body['category_name'],"parent":req.body['parent']};
    
    categoryModel.createCategory(data)
        .then(function(cat){
            res.redirect("/category");
            
        })
        .catch(function(err){
            console.log(err);
        });
}