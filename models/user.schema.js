var mongoose = require("mongoose");
//const bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
    name         : { type : String, required : true },
    email        : { type : String, required : true, unique : true },
    password     : { type : String, required : true,min:6 },
    mobile       : { type : Number, min:10 },
    gender       : { enum : ['male','female'] },
    created_date : { type:Date,default:new Date() },
    updated_date : { type:Date,default:null }
});



module.exports = userSchema;