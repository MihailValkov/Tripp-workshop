const userModel = require('../models/user');
const jwt = require('../utils/jwt');
module.exports= {
    get:{
        register (req,res,next){
            res.render('user/register.hbs', {title :"Register Page"});
        },
        login (req,res,next){
            res.render('user/login.hbs',{title :"Login Page"});
        },
        logout(req,res,next){
            res.clearCookie(process.env.AUTH_COOKIE_NAME);
            res.user= null;
            res.redirect('/home');
        }
    },
    post:{
        async register(req,res,next){
           const { email,password,rePassword} = req.body;
           if (password !== rePassword){res.render('user/register.hbs', {email,password,rePassword,message : 'Passwords is don\'t match'}); return}
           try {
            const user = await userModel.findOne({ email});
            if(user){ res.render('user/register.hbs', {message : "Email address is already taken!"}); return; }
            await  userModel.create({ email, password});
            return res.render('user/login.hbs',{email}).status(201);
               
           } catch (error) {
            if(error.name === 'ValidationError'){
                const message= error.message.includes("Path")? "Please fullfil all fields" 
                : error.message.split(": ")[error.message.split(": ").length-1]
                res.render('user/register.hbs',{email,password,rePassword, message})
                return;
            }
               next(error)
           }
          
        },
        async login(req,res,next){
            const {email, password}= req.body;
            try {
                const user = await userModel.findOne({email});
                if(!user) {res.render('user/login.hbs',{message : 'There is no such username or email!'}); return;}
                const match= await user.matchPasswords(password);
                if (!match) {res.render('user/login.hbs',{message : 'Email or Password is not valid!'}); return;}
                const token = jwt.createToken(user);
                req.user=user;
                res.cookie(process.env.AUTH_COOKIE_NAME, token).redirect('/home/');
            } catch (error) {
                next(error)
            }
         

        },
    }
}