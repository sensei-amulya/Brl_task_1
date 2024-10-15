const express = require("express")
const mongoose = require("mongoose")
//const bodyParser=require('bodyParser')
const cors = require('cors')
const path = require("path")
const noteroute=require('./routes/notesroutes');
const { MongoServerClosedError } = require("mongodb");
const userlog=require('./routes/login')
const userRoute = require('./routes/register');
const note = require("./models/note");
const staticroute=require('./routes/staticroute')
const app = express();
const port =3030;

app.set("view engine","ejs");
app.set("views",path.resolve("./views"))
app.use(cors({
    origin :'*'
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}));



 mongoose.connect('mongodb+srv://amulyagupta26:"**"@notepadapp.nfrun.mongodb.net/note_making',
   { useNewUrlParser: true,
    useUnifiedTopology: true,})
    .then(()=> console.log("MongoDb connected")).
    catch(err => console.log(err));




app.use('/',staticroute)
app.use('/api',noteroute);
app.use('/user',userRoute);
app.use('/user',userlog);
app.listen(port,() =>{
    console.log("Server running ")
})

