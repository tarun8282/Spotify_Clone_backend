const userModel = require("../model/user.model")
const cookie = require("cookie-parser")
const jwt = require("jsonwebtoken")


function createToken(user) {
    
    var token = jwt.sign(
        {
            id:user._id,
            username:user.userName,
            name:user.name,
            email:user.email,
            role:user.role
        },
        process.env.jwtSecret,
        { expiresIn: "7d" }
    )
    return token
}



async function registerUser(req,res) {           //Creating User

    try {
        
        const {userName,name,email,phoneNo,age,role,password} = req.body
        
        const userExists = await userModel.findOne({            //find if user with this email or username exists 
            $or:[
                {username:req.body.userName},
                {email:req.body.email}
            ]
        })

        if (userExists) {
            return res.status(409).json({
                message: "User already exists. Please use a different email or username."
            })
        }

        const user = await userModel.create({userName,name,email,phoneNo,age,role,password})   //creating user

        const token = createToken(user)
        
        res.cookie("token",token)
        

        return res.status(201).json({        
                message:"User Created Sucessfully",
                User:user
        })

    } catch (error) {

            return res.status(400).json(error)
    }
    
} 


async function login(req,res) {                  // Login 
    
    const {userName,password}=req.body
    
    try {
        
        const user = await userModel.findOne({
            userName,password
        })
        if(user){

            const token = createToken(user)

            res.cookie("token",token)

            return res.status(200).json({
                    message:"Login sucessfull"
                })
                console.log(user);

        }else{
        return res.status(401).json({
                message:"incorrect username or password"
            })
        }
        
        

    } catch (e) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: e.message
        });
    }


}








module.exports={registerUser,login}




