const mongoose = require('mongoose');

const tripSchema= new mongoose.Schema({
    startPoint :{
        type:String,
        required: true
    },
    endPoint : {
        type:String,
        required: true
    },
    date :{
        type:String,
        required: true
    },
    time :{
        type:String,
        required: true
    },
    seats : {
        type:Number,
        required:true
    },
    price :{
        type:String,
        required:true
    },
    description : {
        type:String,
        required: true
    },
    carImage : {
        type:String,
        required: true,
        validate: {
            validator: (x)=> {
                return /http:\/\/.+|https:\/\/.+/.test(x);
            },
            message :()=> 'Car image is not a valid URL !'
        }
    },
    carModel : {
        type:String,
        required:true
    },
    smoking: { type:String},
    eating: { type:String},
    drinking: { type:String},
    climatic: { type:String},
    creator :{type : String},
    buddies : [ {type : mongoose.Schema.Types.ObjectId , ref : "User"}]

});

module.exports = mongoose.model('Trip', tripSchema)


