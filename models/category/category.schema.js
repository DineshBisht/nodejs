var mongoose = require("mongoose");

var subCategories = mongoose.Schema({
    name         : { type : String, required : true },
    slug         : { type : String },
    enable       : { type:Number,default:0  },
    created_date : { type:Date,default:new Date() },
    updated_date : { type:Date },

});
var categorySchema = mongoose.Schema({
    name            : { type : String, required : true },
    slug            : { type : String },
    enable          : { type:Number,default:0  },
    subCategories   : [subCategories],
    created_date    : { type:Date,default:new Date() },
    updated_date    : { type:Date },
});


categorySchema.pre("save",function(next){
    var category = this;
    var name = category.name;
    category.slug = name.replace(" ","-");
    next();
});
categorySchema.pre("update",function(next){
    var category = this;
    var name = category.name;
    category.slug = name.replace(" ","-");
    category.updated_date = new Date();
    next();
});



module.exports = categorySchema;
