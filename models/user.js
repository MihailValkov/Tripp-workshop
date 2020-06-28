const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email :{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator :(x)=>{
                return /[A-Za-z0-9_]+@[A-Za-z0-9]+\.[a-zA-Z]{2,3}/.test(x)
            },
            message:()=> `Email address is not valid !`
        }
    },
    password : {
        type:String,
        required:true,
        minlength:[6,"Password should be at least 6 characters long!"]

    },
    trippsHistory:[{type : mongoose.Schema.Types.ObjectId , ref:'Tripps'}]
    
})

userSchema.methods = {
    matchPasswords : function(password,){
        return bcrypt.compare(password,this.password);
    }
};

userSchema.pre('save',async function (next){
    if(this.isModified('password')){
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(this.password,salt);
            this.password= hash;
            
        } catch (error) {
            next(error)
            return;
        }
    }
    next();
})

module.exports = mongoose.model('User', userSchema);