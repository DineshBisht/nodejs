var mongoose    = require("mongoose");
var userSchema  = require("./user.schema");
//var bcrypt      = require('bcrypt');
var userModel   = mongoose.model("users",userSchema);
var q           = require('q');

    
function createUser(userData){
    var deffered = q.defer();
    userModel.create(userData,function(err,user){
        if(err){
            deffered.reject(err);
        } else {
            deffered.resolve(user);
        }
    });
    return deffered.promise;
}

function login(email,password){
    var deffered = q.defer();
    userModel.findOne({"email":email},function(err,user){
        if(err){
            deffered.reject(err); 
        } else {
            if ( user.password == password ){
                deffered.resolve(user);
            }else{
                deffered.reject("Invalid user");
            }
   
            
            /*if(user){
                bcrypt.compare(password, user.password, function(err, res) {
                    if(res)
                        deffered.resolve(user);
                    else
                        deffered.reject("Invalid password");    
                });
            }
            else{
                
            }*/
        }
    });
    return deffered.promise;
    
    
}

function getUsers(){
    var deffered = q.defer();
    userModel.find(function(error,users){
        if(error)   
            deffered.reject(error);
        else 
            deffered.resolve(users);
    });
    return deffered.promise;
}

function deleteAllUsers(){
    var deffered = q.defer();
        userModel.remove(function(err,users){
            if(err)
                deffered.reject(err);
            else
            deffered.resolve(users);
        })
    return deffered.promise;
}

userModel.createUser = createUser;
userModel.getUsers   = getUsers;
userModel.deleteAllUsers = deleteAllUsers;
userModel.login          = login;
module.exports = userModel;