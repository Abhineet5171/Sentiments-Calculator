
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../../model/User');

router.get('/',async (req,res)=>{
    try {
       const users = await User.find().populate('username',['location','vote', 'department','designation','voted'])
       res.json(users); 
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
        
    }
})

module.exports = router;