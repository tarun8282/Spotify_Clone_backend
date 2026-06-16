const express = require("express")
const app = express()
const cookieParser=require("cookie-parser")
const auth = require("./routes/auth.routes")
const account = require("./routes/account.routes")



app.use(express.json())
app.use(cookieParser())


app.use("/api/auth",auth)
app.use("/api/account",account)



module.exports=app