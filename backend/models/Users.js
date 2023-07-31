const mongoose=require('mongoose')
const { Schema } = mongoose;
const UserSchema = new Schema({
    name:{
        type: String,
        required:[true,"please provide user name"]
        
    },
    email:{
        type:String,
        required:[true,"please provide valid email"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Please provide a password"],
        
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date
    })
    
const User=mongoose.model('users',UserSchema)
module.exports= User