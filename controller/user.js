const User= require('../models/userSch')


async function Handlesinup(req,res) {
    const { Name,username,password}=req.body;
    await User.create({
        Name,
        username,
        password
    });
    return res.status(200).json("The New user is registered succesfully")
}

async function Handlelogin(req,res) {
    const{ username,password}=req.body
    const user = await User.findOne({username,password})
    if(!user) res.json("wrong username or password")
    
        return res.status(200).json("loggedin")
}


module.exports={
    Handlesinup,
    Handlelogin,
}