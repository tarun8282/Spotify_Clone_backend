const express=require("express")
const router = express.Router()
const {getprofile,updateProfile,deleteUser} = require("../controller/account.controller")


router.get("/profile",getprofile)
router.patch("/profile",updateProfile)
router.delete("/profile",deleteUser)

module.exports=router