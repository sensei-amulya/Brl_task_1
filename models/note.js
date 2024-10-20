const mongoose =require("mongoose")


const schemanote=new mongoose.Schema({
    Noteid:{
        type:String,
        unique:true
    },
    NoteTitle: {
        type: String,
        required: true, 
          unique:true
      },
      Content: {
        type: String,
        required: true,
      },
      userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
      }
  
    },{timestamps:true})
  
  
  module.exports=mongoose.model("note",schemanote)
