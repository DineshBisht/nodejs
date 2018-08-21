var mongoose       = require("mongoose");
var q           = require('q');
var categorySchema = require("../category/category.schema");
var categoryModel  = mongoose.model("categorys",categorySchema);

function createCategory(data){
    var deffered = q.defer();
    
    if ( data.parent !="0" ){
        categoryModel.findOne({"_id":data.parent},function(err,category){
            
            if( category ){
                var sub_cat = { name:data.name };
                category.subCategories.push(sub_cat);
                category.update(category,function(err,childcategory){
                    if ( childcategory ) {
                        deffered.resolve(childcategory);
                    }
                });
            }
        });
    }
    categoryModel.create(data,function(err,category){
        if ( err ){
             deffered.reject("Category Not saved error :"+err);
        } else {
            deffered.resolve(category);
        }
    });
    return deffered.promise;
}

function getCategory( category_id =  false ){
    var deffered = q.defer();
    if ( category_id ){
        categoryModel.find({"_id":category_id,"enable":0},function(err,category){
            if ( err ){
                 deffered.reject("Error : "+err)  ;
            }
            else {
                 deffered.resolve(category);
            }
        });
    } else {
        categoryModel.find({"enable":0},function(err,category){
            if ( err ){
                 deffered.reject("Error : "+err)  ;
            }
            else {
                 deffered.resolve(category);
            }
        });
    }
    return deffered.promise;
}

 

function updateCategory(data,category_id){
    
    var deffered = q.defer();
    
    categoryModel.findOne({_id:category_id},function(err,category){
        if( err ){
             deffered.reject("Error : "+err);
        } if ( category) {
            category.update(data,function(err,updatedCategory){
                if ( err ){
                     deffered.reject("Error "+err);
                } else {
                     deffered.resolve(updateCategory);
                }
            });
        }
    });

    return deffered.promise;
}

categoryModel.createCategory = createCategory;
categoryModel.getCategory    = getCategory;
categoryModel.updateCategory = updateCategory;
module.exports = categoryModel;
