const express= require("express")
const router = express.Router();
const Note =require('../models/note')


router.get("/notes  ",async(req,res)=>{
    const existingnote=await Note.find();
    res.json(existingnote);
})


//2nd api to fetch a particular element by ID
router.get("/note",async(req,res)=>{
    const noteid=req.query.Noteid;
    try{
        const note = await Note.findById(noteid)
        if(note){
            res.json(note);
        } else{
            res.status(404).json({msg:"Note not found"})
        }
    } catch(err){
        res.status(500).json({msg:err.msg})
    }
})

router.post('/notes',async(req,res)=>{
    const note=new Note({
        Noteid: req.body.Noteid,
        NoteTitle:req.body.NoteTitle,
        Content:req.body.Content,
});
try{
    const newNote=await note.save();
    res.status(201).json(newNote);
}catch(err){
    req.status(400).json({msg : err.message})
}
});

/*router.delete('/notes/:id',async(req,res)=>{
    try{
        const note=await Note.findById(req.params.id);
        if(note==null){
            return res.status(404).json({msg:"Note not found"});
        }
        await note.remove();
        res.status(200).json({msg:"Deleted Note"})
    } catch(err){
        res.status(500).json({message:err.message})
    }
})
*/
router.post("/delete",async(req,res)=>{
    const {Noteid}=req.body;
   // console.log(Noteid)
    await Note.findOneAndDelete({Noteid: Noteid})
})


module.exports=router;