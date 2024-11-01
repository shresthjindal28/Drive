const Firebase = require('firebase-admin')

const serviceAccount = require('../drive-a2494-firebase-adminsdk-yxexn-78afcda27b.json')

const firebase = Firebase.initializeApp({
    credential:Firebase.credential.cert(serviceAccount),
    storageBucket:'drive-a2494.appspot.com'
})


module.exports = Firebase