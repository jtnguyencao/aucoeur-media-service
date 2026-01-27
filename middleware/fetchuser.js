const jwt = require('jsonwebtoken')
const User = require('../models/User')
const JWT_SECRET = 'Jamesboy'

const fetchuser = async (req, res, next) => {
    const token = req.header('Authorization')
    
    if(!token){
        return res.status(401).send({error:"Please authenticate using a valid token"})
    }
    
    try{
        const data = jwt.verify(token, JWT_SECRET)
        
        // Check if user still exists in database
        const user = await User.findById(data.user.id)
        if (!user) {
            return res.status(401).send({error: "USER_NOT_FOUND", message: "User account no longer exists"})
        }
        
        req.user = data.user
        next()
    }catch(error){
        return res.status(401).send({error:"Please authenticate using a valid token"})
    }
}

module.exports = fetchuser