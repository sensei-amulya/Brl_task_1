const express= require("express")
const router = express.Router();
const Note =require('../models/note')

//route to display all the Notes
router.get("/",async(req,res)=>{
    const existingnote=await Note.find();
    res.json(existingnote);
})


//route to display note at a particular id
router.get("/note/:Noteid", async (req, res) => {
    const  Noteid  = req.params.Noteid;
    const singleData = await Note.findOne({ Noteid});
    //console.log(singleData)
    res.json(singleData)
})


//route to enter new Note
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


//route to delete a particular Note
router.post("/deleteOne/:Noteid",async(req,res)=>{
    const  Noteid=req.params.Noteid
    await Note.findOneAndDelete({Noteid:Noteid});
    res.send("deleted ")
})

//route to delete all items
router.get("/deleteAll", async (req, res) => {
    await Note.deleteMany({})
    res.send("deleted all")
})

//route to modifiy 
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
// patch route
router.patch("/patch", async (req, res) => {

    const { Noteid, NoteTitle, Content } = req.body;

    const updatedNote = await Note.findOneAndUpdate(
        { Noteid: Noteid },
        { $set: { NoteTitle, Content } },
        { new: true } // Return the updated document
    );

    if (!updatedNote) {
        return res.send(`Note not found on noteId ${noteId}`);
    }

    res.send(updatedNote);
})


//to find the recent item entered
router.get("/recent" , async (req,res) => {
    const note = await Note.find().sort({createdAt : -1}).limit(1)
    
    console.log(note)
    res.send(note)
})


module.exports=router;