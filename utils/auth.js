const jwt = require('./jwt')
module.exports = (auth=false)=> {
    return function(req,res,next){
        const token = req.cookies[process.env.AUTH_COOKIE_NAME] || '';
       jwt.verifyToken(token,process.env.SECRET)
       .then((user)=> {
           user.isAuth =!!user.id;
           req.user =user
          next();
        }).catch((err)=> {
            if(!err && auth === false) { next(); return;}
            if(!err && auth === true) {  res.redirect('user/login'); return;}
        })
    }

}