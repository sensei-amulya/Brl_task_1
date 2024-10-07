const express= require("express")
const router = express.Router();
const Note =require('../models/note')


router.get("/",async(req,res)=>{
    const existingnote=await Note.find();
    res.send(existingnote);
})



router.get("/note", async (req, res) => {
    const { Noteid } = req.body;
    const singleData = await Note.findOne({ Noteid: Noteid });
    console.log(singleData)
    res.send(singleData)
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
/*router.post("/delete",async(req,res)=>{
    const {Noteid}=req.body;
   // console.log(Noteid)
    await Note.findOneAndDelete({Noteid: Noteid})
})*/

router.post("/delete1",async(req,res)=>{
    const { Noteid}=req.body;
    await Note.findOneAndDelete({Noteid:Noteid});
    res.send("deleted")
})

//route to delete all items
router.get("/deleteAll", async (req, res) => {
    await Note.deleteMany({})
    res.send("deleted all")
})


router.put("/put", async (req, res) => {
    const { } = req.body;
    const { Noteid, NoteTitle, Content } = req.body;


    const updatedNote = await Note.findOneAndUpdate(
        { Noteid: Noteid },
        { $set: { NoteTitle: NoteTitle, Content:Content } },
        { new: true } // Return the updated document
    );

    if (!updatedNote) {
        res.send(`note not found on noteId ${Noteid}`)
    }
    else {

        res.send(updatedNote)
    }


})



module.exports=router;