const mongoose=require("mongoose")
const { required } = require("nodemon/lib/config")
const { stringify } = require("nodemon/lib/utils")

const user = new mongoose.Schema({


    name:{
        type:String,
        trim:true,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    password:{
        type:String,
        trim:true,
        required:true
    },
    photo:{
        type:String
    },

    

},{timestamps : true})

module.exports = mongoose.model("user",user)