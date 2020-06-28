const jwt = require('jsonwebtoken');

module.exports = {

    createToken: function(user){
        return jwt.sign({id:user._id},process.env.SECRET)
    },
    verifyToken: function(token){
        return jwt.verify(token,process.env.SECRET)
    }
}