const mongoose = require("mongoose")
require('dotenv').config();

async function connectdb() {
    await mongoose.connect(process.env.mongo_url)
    .then(()=>{
        console.log("Connected to MongoDB");
        
    }).catch((err)=>{

        console.log("Connection err:",err);

    })
}


module.exports=connectdb