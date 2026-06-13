const userModel = require("../model/user.model")
const cookie = require("cookie-parser")
const jwt = require("jsonwebtoken")


async function registerUser(req,res) {

    const {userName,name,email,phoneNo,age,role,password} = req.body
    
    const userExists = await userModel.findOne({            //find if user with this email or username exists 
        $or:[
            {username:req.body.userName},
            {email:req.body.email}
        ]
    })

    if (userExists) {
        return res.status(422).json({
            message: "User already exists. Please use a different email or username."
        })
    }

    const user = await userModel.create({userName,name,email,phoneNo,age,role,password})   //creating user

    var token = jwt.sign(
        {
            username:userName,
            name:name,
            email:email
        },
        process.env.jwtSecret,
        { expiresIn: "7d" }
    )
    
    res.cookie("token",token)
    

    return res.status(201).json({        
            message:"User Created Sucessfully",
            User:user
    })
} 

module.exports=registerUser




