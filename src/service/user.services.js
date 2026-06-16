const userModel = require("../model/user.model")
const jwt = require("jsonwebtoken")


async function getUserByToken(token){                   //sends user data using jwt token 
    
    const data = jwt.verify(token,process.env.jwtSecret)
        
   try {

        const user = await userModel.findById(data.id).select('-password')
        
        return user

   } catch (error) {

        return error
        
   }
    
}


module.exports=getUserByToken