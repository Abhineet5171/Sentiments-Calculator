const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs')
const User = require('../../model/User');

//@route  POST api/users
//@desc   create new user
//@access PUBLIC 
router.post('/',[
check('name', 'name is required').not().isEmpty(),
check('username', 'username is required').not().isEmpty(),
check('username', 'username must be atleast 4 chars').isLength({min:4}),
check('password','Please enter a password with 6 or more character').isLength({min:6}),
// check('dateOfBirth','Please Select a date').isEmpty(),
check('location','Enter a valid location').isLength({min:3}),
check('department','Enter a valid department').isLength({min:2}),
check('designation','Designation cannot be less than 3 char').isLength({min:3}),
],

async (req,res)=>{
    console.log(req.body);
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array() });
    }

    const {username,name,password,dateOfBirth,location,department,designation} = req.body;

    try{
        //see if user exists
            let user = await User.findOne({'username':username})

            if (user) {
                res.status(400).json({error: [{msg:"username Already Exist"}]});
            }
            
            else if (!user){    
                user = new User({
                    username,
                    name,
                    dateOfBirth,
                    location,
                    department,
                    designation
                })
                //hash password
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password,salt);
                
                await user.save();
                console.log("user registered");
                
                
                //return jsonwebtoken(so that when user sign up, he/she gets logged in right away)
                const payload = {
                    user: {
                        id:user.id
                    }
                }

                jwt.sign(payload, config.get('jwtToken'), {expiresIn:360000},(err,token)=>{
                    if (err) throw err;
                    res.send({token});
                });
                }




    } catch(err){
        console.error(err.message);
    }
})

//get all users (to be consumed internally)
router.get('/all',async (req,res)=>{
    
    
    if(req.headers.key==="valid-key"){try {
       const users = await User.find();
       res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }}
    else {res.status(401).send("UNAUTHORISED REQUEST")}
})

//get a user's data
//@route  Get api/user/user/:user_id
//@desc   Get profile by user id
//@access Public

router.get('/:username',async (req,res)=>{
    console.log("here")
    try {
       const user = await User.findOne({username: req.params.username});
        if(!user){return res.status(400).json({msg:"Profile not found"})}

       res.json(user); 
    } catch (err) {
         console.log(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg:"Profile not found"})
        }
        console.error(err.message);
        res.status(500).send('Server Error');
        
    }
})






module.exports = router;
