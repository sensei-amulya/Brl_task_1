const express = require("express")
const mongoose = require("mongoose")
//const bodyParser=require('bodyParser')
const cors = require('cors')

const noteroute=require('./routes/notesroutes');
const { MongoServerClosedError } = require("mongodb");

const userRoute = require('./routes/register')
const app = express();
const port =3030;


app.use(cors({
    origin :'*'
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}));



mongoose.connect('mongodb://localhost:27017/notepad1',
   { useNewUrlParser: true,
    useUnifiedTopology: true,}).then(()=> console.log("MongoDb connected")).catch(err => console.log(err));

app.use('/api',noteroute);
app.use('/user',userRoute)
app.listen(port,() =>{
    console.log("Server running ")
})

