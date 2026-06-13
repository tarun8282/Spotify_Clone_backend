const express = require("express")
const app = express()
const cookieParser=require("cookie-parser")
const auth = require("./routes/auth.routes")




app.use(express.json())
app.use(cookieParser())


app.use("/api/auth",auth)



module.exports=app