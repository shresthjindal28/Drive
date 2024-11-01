const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    path:{
        type: String,
        required: [true, 'Path is required'],

    },
    originalname:{
        type: String,
        required: [true, 'Original name is required'],

    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: [true, 'User is required']

    }
})

const File = mongoose.model('Files', fileSchema)
module.exports = File