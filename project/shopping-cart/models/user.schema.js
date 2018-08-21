var mongoose = require("mongoose");
const bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
    name         : { type : String, required : true },
    email        : { type : String, required : true, unique : true },
    password     : { type : String, required : true,min:6 },
    mobile       : { type : Number, min:10 },
    gender       : { enum : ['male','female'] },
    created_date : { type:Date,default:new Date() },
    updated_date : { type:Date,default:null }
});

userSchema.pre('save',function(next){
    var user = this;
    
    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});

module.exports = userSchema;