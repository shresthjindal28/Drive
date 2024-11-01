const mongoose = require('mongoose')

const userSchema = new  mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: [3, 'user name must be of atleast 3 character']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: [13, 'email must be of atleast 13 character']

    },
    password: {
        type:String,
        required: true,
        trim: true,
        minlength: [5, 'password must be of atleast 5 character']
    },
})

const user = mongoose.model('user', userSchema)

module.exports = user