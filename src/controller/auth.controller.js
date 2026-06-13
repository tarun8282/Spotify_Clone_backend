const userModel = require("../model/user.model")




async function registerUser(req,res) {

    const {username,name,email,phoneNo,age,role,password} = req.body

    const userExists = await userModel.findOne({            //find if user with this email or username exists 
        $or:[
            {username},
            {email}
        ]
    })

    if(userExists){                         //if user is there with the same email,username return a error
        return res.status(422).json({
            message:"User Already Exists , use a diffrent Email / username"
        })
    }

    const user = await userModel.create({username,name,email,phoneNo,age,role,password})   //creating user

    



    return res.status(201).json({        
            message:"User Created Sucessfully",
            User:user
    })
} 

module.exports=registerUser




