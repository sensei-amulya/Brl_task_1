const express = require("express")
const {HandleLogout} = require("../controller/user")
const router = express.Router()

router.get("/logout",HandleLogout)

module.exports=router