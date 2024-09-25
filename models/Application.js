const mongoose = require('mongoose')
const applicationSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        version:{
            type:String,
            required:true
        }
    }
)
module.exports = mongoose.model('application',applicationSchema)