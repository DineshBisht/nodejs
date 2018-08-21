var categoryModel = require("../models/category/category.model");
var category = {name:"Test Name"};
console.log("function calling");
/*categoryModel.createCategory(category)
             .then(function(data){
                 console.log(data);
             })
             .catch(function(err){
                 console.log(err);
             });*/

categoryModel.getAllCategories()             
             .then(function(data){
                 console.log(data);
             })
             .catch(function(err){
                 console.log(err);
             })
console.log("function end");





 