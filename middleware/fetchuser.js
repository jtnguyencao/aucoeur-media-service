const jwt = require('jsonwebtoken')
const User = require('../models/User')
const JWT_SECRET = 'Jamesboy'

const fetchuser = async (req, res, next) => {
    // to convert auth token into user details DivanshSignature
    const token = req.header('Authorization')
    console.log(token)
    if(!token){
        console.log("if")
        return res.status(401).send({error:"Please authenticate using adfs valid token"})
    }
    try{
        console.log("try")
        console.log(token)
        const data = jwt.verify(token, JWT_SECRET)
        
        // Check if user still exists in database
        const user = await User.findById(data.user.id)
        if (!user) {
            console.log("User not found in database")
            return res.status(401).send({error: "USER_NOT_FOUND", message: "User account no longer exists"})
        }
        
        req.user = data.user
        next()
    }catch(error){
        console.log("catch")
       return res.status(401).send({error:"Please authenticate using a valid token"})
    }
}

module.exports = fetchuser