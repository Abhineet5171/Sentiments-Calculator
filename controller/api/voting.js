const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs')
const User = require('../../model/User');
const auth = require("../../middleware/auth");


//create and update user voting
router.post('/',[auth,[
    check('vote','vote is Required').not().isEmpty()
]
],async (req, res)=>{
    
    const error = validationResult(req);
    if (!error.isEmpty()){
        return res.status(400).json({error: errors.array() });
    }

    let user = await User.find({_id:req.user.id});
    //we get user data

     userData =user[0];
     userData.voted = true;
     userData.vote = req.body.vote;

         user= await User.findOneAndUpdate(
            {_id:req.user.id},
            {$set:userData},
            {new:true}
         )
    //         return  res.json(profile);

    // }

    res.send(user);
})

module.exports = router;