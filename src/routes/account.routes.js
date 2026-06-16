const express=require("express")
const router = express.Router()
const {getprofile,updateProfile} = require("../controller/account.controller")


router.get("/profile",getprofile)
router.put("/profile",updateProfile)

module.exports=router