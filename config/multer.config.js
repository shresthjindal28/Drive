const multer = require('multer')
const firebaseStorage = require('multer-firebase-storage')
const firebase = require('./firebase.config')
const serviceAccount = require('../drive-a2494-firebase-adminsdk-yxexn-78afcda27b.json')

const storage = firebaseStorage({
    credentials:firebase.credential.cert(serviceAccount),
    bucketName:'drive-a2494.appspot.com',
    unique: true,
})

const upload = multer({
    storage: storage,
})

module.exports = upload