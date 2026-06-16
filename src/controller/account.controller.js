const userModel = require("../model/user.model")
const jwt = require("jsonwebtoken")
const getUserByToken=require("../service/user.services")       


async function getprofile(req,res){
   try {

        const token=req.cookies.token
    
        const user = await getUserByToken(token)

        res.send(user)

   } catch (error) {
        res.status(404).json({

            message:"please Signup / login again"
        })
   } 
    
    
    
}

async function updateProfile(req,res){

    try {

        const token=req.cookies.token

        const userId =  jwt.verify(token,process.env.jwtSecret).id
        
        
        const{name,email,phoneNo,age}= req.body

        const updatedUser = await userModel.findOneAndUpdate(
                { _id:userId },
                {
                    $set: {
                        name,
                        email,
                        phoneNo,
                        age
                    }
                },
                {new:true}
        );

        res.status(200).json({
            message:"Profile Updated Succefully",
        })

        
    } catch (error) {
        
        return res.status(400).json(error)

    }

   



}



module.exports={getprofile,updateProfile}