const express =  require('express')
const router =  express.Router()
const { body, validationResult } = require('express-validator');
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



router.get('/register',(req,res, next)=>{
    res.render('register')
})

router.post('/register',
    body('email').trim().isEmail().isLength({min: 12}),
    body('password').trim().isLength({min:5}),
    body('username').trim().isLength({min:3}),
    async (req, res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
       return res.status(400).json({
        errors: errors.array(),
        message: 'Invalid input'
       })
    }
    
    const  {email,password,username} = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await userModel.create({
        email,
        password: hashedPassword,
        username
    })
    await newUser.save();
    res.redirect('/login');
})

router.get('/login',(req,res)=>{
    res.render('login')
})

router.post('/login',
    body('password').trim().isLength({min:5}),
    body('username').trim().isLength({min:3}),
    async (req, res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
             errors: errors.array(),
             message: 'Invalid input'
            })
         }
         const {username,password} = req.body
         const user = await  userModel.findOne({
            username: username
        })
        const isMatch = await bcrypt.compare(password, user.password)

        if(!user){
            return res.status(401).json({
                message: 'Invalid username or password'
            })
        }

        if(!isMatch){
            return res.status(401).json({
                message: 'Invalid username or password'
            })
        }


        const token =  jwt.sign({
            userId:user._id,
            email:user.email,
            username:user.username
        },
        process.env.JWT_SECRET, 
    )
        res.cookie('token', token)
        // window.location = '/home'
        // res.send('Logged in')
        res.redirect('/home')
        // res.render('home')
        
        
    }
)

module.exports = router