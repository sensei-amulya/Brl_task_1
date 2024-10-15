const express = require("express")
const {Handlesinup} = require("../controller/user")
const router = express.Router()

router.post("/register" , Handlesinup);

module.exports = router