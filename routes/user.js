const express = require('express')

const User = require("../models/User.js")
const router = express.Router()
const JWT_SECRET = 'Jamesboy'
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {body,validationResult} = require('express-validator')

//signup
router.post('/adduser',[
    body('name','Enter a valid name').isLength({min:3}),
    body('password', 'Password should have atleast 6 characters').isLength({ min: 6 }),
    body('email','Enter valid email').isEmail()
    
],async (req,res)=>{
    let answer = 0
    let success  = false
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        answer=1
        return res.status(400).json({answer,success,errors:errors.array()})
    }
    try{
    let user = await User.findOne({email:req.body.email})
    if(user){
        answer = 2
        return res.status(400).json({answer,success,error:"sorry user with this email exits"})
    }
    const salt = bcrypt.genSaltSync(10)
    const securedPassword = bcrypt.hashSync(req.body.password, salt)
    user = await User.create({
        name:req.body.name,
        email:req.body.email,
        password:securedPassword}
    )
    const data ={
        user:{
            id:user.id
        }
    } 
    var token = jwt.sign(data, JWT_SECRET)
    success = true
    res.send({answer,success,token})
    }
    catch(err){
        return res.status(500).json({error:err})
    }
}) 

//login
router.post("/loginuser", [
    body('password', 'Password should have atleast 6 characters').isLength({ min: 6 }),
    body('email', 'Enter valid email').isEmail()
], async (request, response) => {
    let success = false
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        return response.status(400).json({success,error: errors.array() })
    }
    const { email, password } = request.body
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return response.status(400).json({success, error: "You entered wrong password or email" })
        }
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return response.status(400).json({success, error: "You entered wrong password or email" })
        }
        const data = {
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        }
        var token = jwt.sign(data, JWT_SECRET)
        success = true
        console.log(token)
        response.send({success, token })
    } catch (error) {
        response.status(500).send(error)
    } 
})

//modify
router.post("/modify", [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('oldPassword', 'Password should have atleast 6 characters').isLength({min: 6}),
    body('newPassword', 'Password should have atleast 6 characters').isLength({min: 6}),
], async (request, response) => {
    let success = false
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        return response.status(400).json({ success, error: errors.array() })
    }
    const { name, email, oldPassword, newPassword } = request.body
    try {
        let user = await User.findOne({ email })
        if (user) {
            if (oldPassword ==="EmptyString" && newPassword === ("EmptyString")){
                user.name = name
            }
            else{
                const match = await bcrypt.compare(oldPassword, user.password)
                if (!match) {
                    return response.status(400).json({success, error: "You entered wrong password" })
                }
                const salt = bcrypt.genSaltSync(10)
                const securedPassword = bcrypt.hashSync(newPassword, salt)
                user.password = securedPassword
            }
            await user.save()
            var token = jwt.sign({ user: { id: user.id, email: user.email, name: user.name, password: user.password } }, JWT_SECRET)
            success = true
            response.send({ success, token })
        } else {
            response.status(404).send({ success, message: "User not found" })
        }
    } catch (error) {
        response.status(500).send(error)
    }
})

module.exports = router