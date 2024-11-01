const express = require('express')
const router = express.Router()
const upload = require('../config/multer.config')
const fileModel = require('../models/files.models')
const authMiddleware = require('../middlewares/auth')
const firebase = require('../config/firebase.config')

router.get('/',(req,res)=>{
    res.render('main')
})

router.get('/home', authMiddleware ,async (req,res)=>{
    const userFiles = await  fileModel.find({
        user:req.user.userId
    })
    const ussername = req.user.username

    res.render('home',{
        files: userFiles,
        username: req.user.username   
    })
})

router.post('/upload',authMiddleware ,upload.single('file'), async(req, res) =>{
    const newfile = await fileModel.create({
        path: req.file.path,
        originalname: req.file.originalname,
       
        user:req.user.userId
    })
    await newfile.save()
    res.redirect('/home')
    
})

router.get('/download/:path',authMiddleware, async(req,res)=>{
    const loogedInUserId = req.user.userId
    const path = req.params.path
    const file = await fileModel.findOne({
        user: loogedInUserId,
        path:path
    })
    if(!file){
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }

    const signedUrl = await firebase.storage().bucket().file(path).getSignedUrl({
        action: 'read',
        expires: Date.now() + 15 * 60 * 1000
    })
    res.redirect(signedUrl[0])
    res.download(file.path)
})

module.exports = router