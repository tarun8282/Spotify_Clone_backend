const userModel = require("../model/user.model")
const jwt = require("jsonwebtoken")
const getUserByToken=require("../service/user.services")       


async function getprofile(req,res){
   try {

        const token=req.cookies.token
        if(!token){
            return res.status(401).json({
                message:"Unauthorized"
            })
        }
        const user = await getUserByToken(token)

        res.send(user)

   } catch (error) {
        res.status(500).json({
            message: "Internal server error"    
        })
   } 
    
    
    
}

async function updateProfile(req,res){

    try {

        const token=req.cookies.token
         if (!token) {
                return res.status(401).json({
                message: "Unauthorized"
            });
        }
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
        
        if(!updatedUser){
           return res.status(404).json({
                message:"Profile Not Found"
            })
        }

        res.status(200).json({
            message:"Profile Updated Succefully",
        })

        
    } catch (error) {
        
        return res.status(400).json({ message: "Update failed" })

    }

   



}

async function deleteUser(req,res){

    try {

        const token = req.cookies.token

        if (!token) {
                return res.status(401).json({
                message: "Unauthorized"
            });
        }
    
    

        const userId = jwt.verify(token,process.env.jwtSecret).id   //getting only the id part from token info ! 
        
        const pass = req.body.password

        const user = await userModel.findById(userId)

        if(pass==user.password){
            const deletedUser = await userModel.findByIdAndDelete(userId);  

            if(!deletedUser || deletedUser==null){                                       //if no user is found
            return res.status(404).json({           
                    message:"No user Found"
                })
            }

            res.clearCookie("token");    //clearing cookie after deleting 

            res.status(200).json({
            message: "Success",
            });
        }
        else{
            return res.status(401).json({
                message:"unauthorized"
            })
        }
        
        

        

    } catch (error) {
        res.status(500).json({
             message: "Internal server error"
        })   
    }
    
    
    
}



module.exports={getprofile,updateProfile,deleteUser}