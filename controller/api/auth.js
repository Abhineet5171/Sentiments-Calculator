const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs')
const User = require('../../model/User')


//@route  GET api/auth
//@desc   takes in token and return user data (authenticates if user exist in db) 
//@access PUBLIC 
router.get('/',auth,async (req,res)=>{
    try{
        const user =  await User.findById(req.user.id).select('-password');
        res.json(user); 
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }

})


//@route  POST api/auth
//@desc   Authenticate user & generate token
//@access PUBLIC 
router.post('/',[
    check('username','Please include a valid username').exists(),
    check('password','Please enter a password').exists(),    
    ],
    async (req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:"BAD REQUEST" });
        }
        const {username,password} = req.body;
        try{
            //see if user exists
                let user = await User.findOne({"username":username})
                if (!user) {
                    res.status(400).json({error: [{msg:'Invalid credentials'}]});
                }
                else if (user){    
                    // user exists now compare the entered password
                    const isMatch =  await bcrypt.compare(password, user.password);
                    if (!isMatch){
                        return res.status(400).json({error: [{msg:'Invalid Credentials'}]})
                    }
                    else if (isMatch){
                        const payload = {
                            user: {
                                id:user.id
                            }
                        }
                        
                        jwt.sign(payload, config.get('jwtToken'), {expiresIn:360000},(err,token)=>{
                            if (err) throw err;
                            //set cookie on login
                             res.cookie('x-auth-token',token,{ maxAge: 2 * 60 * 60 * 1000*24, httpOnly: true });
                            res.redirect('/dashboard');
                        });
                    }

                }
    
        } catch(err){
            console.error(arr.message);
        }
    }) 


module.exports = router;