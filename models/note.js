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
  
    },{timestamps:true})
  
  
  module.exports=mongoose.model("note",schemanote)
