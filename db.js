const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
require('dotenv').config()

const connectToMongo=()=>{
    try{
        mongoose.connect(process.env.MONGODB_URI)
    }catch(error){
        console.log("Network error")
    }
}
connectToMongo()
module.exports = connectToMongo
