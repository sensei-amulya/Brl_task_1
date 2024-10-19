const User= require('../models/userSch')
const express =require('express')
const jwt=require('jsonwebtoken')
const cookieparser=require('cookie-parser')
const islogged=require('../middelwares/islogged')
const bcrypt=require('bcryptjs')
//const { use } = require('../routes/register')
require('dotenv').config()


const app=express()
app.use(cookieparser())



async function Handlesinup(req,res) {
    try{
    const { Name,username,password}=req.body;
   const data =await User.findOne({username})
   if(data){
    return res.status(400).json({msg:"Username must be unique"})
   }
   else{
   /*await User.create({
        Name,
        username,
        password
    });
   onst token =jwt.sign({username},"secret");
    res.cokie("token",token)*/
    const hashedpass= await bcrypt.hash(password,10)
    const user  =new User({Name,username,password:hashedpass})
    await user.save();
    return res.status(200).json("The New user is registered succesfully")
} 
    }
catch(err){
    res.status(400).json({msg:err.msg})
}
}

async function Handlelogin(req,res) {
    try{
    const{ username,password}=req.body;
    const user_data = await User.findOne({username})
    if(!user_data){
        return res.status(400).json(`No user with this username`)
    }
   /* else{
        if(password===user_data.password){
            const token =jwt.sign({username},"secret")
            console.log(token)
            res.cookie("token",token)

        }
        else{
            res.json("Wrong password!!")
        }
    }*/
   
   const isMatch=await bcrypt.compare(password,user_data.password)
   if(!isMatch){return res.status(400).json({msg:"Invalid Credentials"})}
    //JWT Generation
    const token=jwt.sign({username},process.env.secret,{expiresIn:'1h'})
    res.cookie("jwttoken",token,{httpOnly:true,secure:true});
    //console.log(token)
    res.status(200).json({msg:"User Logged in succesfully"});}
    catch(error){
        res.status(400).json({msg:error.msg})
        console.log(error)
    }
}

async function HandleLogout(req,res)  {
    try{res.cookie("token","")
    res.json("Cookie erased redirected to /login")
    }catch(err){
        res.status(400).json({msg:error.msg})
        console.log(error)

    }
}



module.exports={
    Handlesinup,
    Handlelogin,
    HandleLogout
}