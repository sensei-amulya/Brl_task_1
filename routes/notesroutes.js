const express = require("express")
const router = express.Router();
const user = require('../models/userSch')
const Note = require('../models/note')
const { islogged } = require('../middelwares/islogged')


//route to get all the notes
router.get("/", islogged, async (req, res) => {
    if (req.user) {
        const User = await user.findOne({ username: req.user.username })
        const existingnote = await Note.find({ userId: user._id })
        res.json(existingnote);
    }
    else {
        res.json("First login and search the note")
    }

})


//route to display note at a particular id
router.get("/note", islogged, async (req, res) => {
    if (req.user) {
        const Noteid = req.query.Noteid;
        const user_dat = await user.findOne({ username: req.user.username })
        console.log(user_dat)
        const singleData = await Note.findOne({ Noteid: Noteid, userId: user._id });
        if (singleData) {
            return res.json(singleData)
        }
        else { res.json({ msg: `No user with the Noteid: =${Noteid}` }) }
    } else {
        res.json({ msg: "Login first to view notes" })
    }
})


//route to enter new Note
router.post('/notes', islogged, async (req, res) => {

        const { Noteid, NoteTitle, Content} = req.body;
        
        try {
            
         if (req.user) {
            const { username } = req.user;
            console.log(username)
            const id = await Note.findOne({ Noteid: Noteid })
            console.log(id)
            const user = await user.findOne({ username })
            console.log(user)
            if (id) {
                res.json({ msg: "Please enter another ID" })
            }
            else {
                const NewNote = await Note.create({
                    Noteid: Noteid,
                    NoteTitle: NoteTitle,
                    Content: Content,
                    userId: user._id
                })
                // NewNote.userId = user._id
                // res.json(NewNote)
                res.send(NewNote)
            }}
         else {
            res.json({ msg: "First login ,you are redirected to /login" })
        }
    }catch (err) {
        res.status(400).json({ msg: err.msg })
     }

});


//route to delete a particular Note
router.delete("/note", islogged, async (req, res) => {
    if (req.user) {
        const Noteid = req.query.Noteid
        const noteDel = await Note.findOne({ Noteid: Noteid });
        console.log("Deleted Note is:", noteDel)
        if (noteDel) {
            await Note.findOneAndDelete({ Noteid: Noteid });
            res.json({ noteDel })
        }
        else {
            res.json({ msg: `No user with the Noteid: =${Noteid}` })
        }
    }
    else {
        res.json({ msg: "Login first to view notes" })
    }

})

//route to delete all items
router.delete("/delete", islogged, async (req, res) => {
    if (req.user) {
        const user = await user.findOne({ username: req.user.username })
        await Note.deleteMany({ userId: user._id })
        res.send("deleted all")
    } else {
        res.json({ msg: "Login first to view notes" })
    }
})

//route to modifiy 
router.put("/note", islogged, async (req, res) => {

    if (req.user) {
        const { } = req.body;
        const { Noteid, NoteTitle, Content } = req.body;


        const updatedNote = await Note.findOneAndUpdate(
            { Noteid: Noteid },
            { $set: { NoteTitle: NoteTitle, Content: Content } },
            { new: true }
        );

        if (!updatedNote) {
            res.send(`note not found on noteId ${Noteid}`)
        }
        else {

            res.send(updatedNote)
        }
    } else {
        res.json({ msg: "Login first to view notes" })

    }


})
// patch route
router.patch("/note", islogged, async (req, res) => {
    if (req.user) {
        const { Noteid, NoteTitle, Content } = req.body;

        const updatedNote = await Note.findOneAndUpdate(
            { Noteid: Noteid },
            { $set: { NoteTitle, Content } },
            { new: true }
        );

        if (!updatedNote) {
            return res.send(`Note not found on noteId ${noteId}`);
        }

        res.send(updatedNote);
    }
    else {
        res.json({ msg: "Login first to view notes" })
    }

})


//to find the recent item entered
router.get("/recent", async (req, res) => {
    const note = await Note.find().sort({ createdAt: -1 }).limit(1)

    console.log(note)
    res.send(note)
})


module.exports = router;