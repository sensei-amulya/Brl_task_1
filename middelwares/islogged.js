const jwt= require('jsonwebtoken')
const express=require('express');
const bcrypt=require('bcryptjs')
const secret="123456"
const islogged = (req,res,next)=>{
    const token = req.headesr.authorization?.split(' ')[1];

    if(token){
        const data=jwt.verify(token,secret,(err,user)=>{
            if(err){return res.status(403).json({err:err.msg})}
            req.user=data
            next();
        })
    } else{
        res.status(401).json({msg:"Missing Token"})
    }
}

module.exports={
    islogged,
}