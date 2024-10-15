const jwt= require('jsonwebtoken')

const secret ="@1234$"

function setUser(id,user){
    const payload={
        id,
        ...user
    }
    return jwt.sign(payload,secret)
}






module.exports={
    setUser,
}