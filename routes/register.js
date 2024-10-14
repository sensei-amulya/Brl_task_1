const express = require("express")
const {Handlesinup} = require("../controller/user")
const router = express.Router()

router.post("/" , Handlesinup);

module.exports = router