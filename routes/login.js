const express = require("express")
const { Handlelogin } = require("../controller/user")
const router = express.Router()

router.post("/login" , Handlelogin);

module.exports = router