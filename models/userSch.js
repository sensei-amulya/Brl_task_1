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
    password:{
        type:String,
        required :true
    },
    Noteid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"note"
    }
},{timestamps:true})



module.exports = mongoose.model("User",UserSchema)