const mongoose =require("mongoose")

const UserSchema=new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        unique:true,
        required:true
    },
    email : {
        type : String
    },
    password:{
        type:String,
        required :true
    },
    Noteid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"note"
    },
    resetPasswordToken:{
        type:String,default:null
    },
    resetPassTokenExpiry:{
        type:Date,
        default:null,
    }
},{timestamps:true})

  


module.exports = mongoose.model("User",UserSchema)