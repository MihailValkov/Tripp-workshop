const jwt = require('jsonwebtoken');

module.exports = {

    createToken: function(user){
        return jwt.sign({email : user.email ,id:user._id,userImage :user.userImage},process.env.SECRET)
    },
    verifyToken: function(token){
        return new Promise((resolve,reject)=>{
            jwt.verify(token,process.env.SECRET,(err,data)=>{
                if(err){ reject(); }
                resolve(data)
            }) 
        }) 
    }
}