const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    voted: {
        type: Boolean,
        default: false
    },
    vote: {
        type: Number,
        required: false
    },
    lastModified: {
        type: Date,
        default: Date.now
    }

});

module.exports = User = mongoose.model('user',UserSchema);