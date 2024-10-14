const User= require('../models/userSch')


async function Handlesinup(req,res) {
    const { Name,username,password}=req.body;
    await User.create({
        Name,
        username,
        password
    });
    return res.json("Home")
}

module.exports={
    Handlesinup,
}