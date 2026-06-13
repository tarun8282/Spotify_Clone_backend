const mongoose=require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")

const UserSchema = new mongoose.Schema({
    userName:{
        type:String,
        require:true,
        unique:true
    },
    name:{
        type:String
    },
    email: {
        type: String,
        required: true,
        validate: {
        validator: validator.isEmail,
        message: 'Invalid email address'
        }
    },
    phoneNo: {
        type: String,
        validate: {
            validator: value => validator.isMobilePhone(value, 'any'),
            message: 'Invalid phone number'
        }
    },
    age:{
        type:Number,
        min:1,
        max:99
    },
    role:{
        type:String,
        enum:['pesant','artist'],
        default:"pesant",
        require:true
        
    },
    password: {
        type: String,
            validate: {
                validator: (value) =>
                validator.isStrongPassword(value, {
                    minLength: 8,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1
                }),
                message: 'Password is not strong enough'
            }
    } 
})


const userModel = new mongoose.model("User",UserSchema)


module.exports=userModel