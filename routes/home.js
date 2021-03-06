const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const axios = require('axios').default;
const config = require('config');


router.get('/', auth,(req,res,next)=>{

    res.redirect('/dashboard');
});

router.get('/login',(req,res,next)=>{
    res.render('login',{pageTitle: "Login to sentiments Calculator", path: '/login'})
})

router.get('/register',(req,res,next)=>{
    res.render('register',{pageTitle: "Register", path: '/register'})
})
router.post('/register',(req,res,next)=>{
    //check if user is already logged in
    if(!req.cookies['x-auth-token']){
        const option = {url: `${config.get('webAddress')}/api/user/`};
        axios.post(option.url, req.body)
        .then((response)=>{
            if(response.data.token){
                res.cookie('x-auth-token',resonse.data.token,{ maxAge: 2 * 60 * 60 * 1000*24, httpOnly: true });
                res.redirect('/dashboard');
            }
        })
        .catch(function (error) {
            // handle error
            // console.log(error.response);
        })
    }
    else {
        res.send("please logout before registering a new user")
    }
    
})

router.get('/dashboard',auth,(req,res,next)=>{
    res.render('dashboard',{pageTitle: "Dashboard", path: '/dashboard'})
})

router.get('/profile',auth,(req,res,next)=>{
   
    const option = {url: `${config.get('webAddress')}/api/user/${req.user.id}`};
    axios({method: 'get',url: option.url})
    .then((response)=>{
        res.render('profile',{pageTitle:"Profile", path:'/profile',name:response.data.name,username:response.data.username,voted:response.data.voted,DOB:response.data.dateOfBirth.split('T')[0],location:response.data.location,department:response.data.department,designation:response.data.designation,vote:response.data.vote})
    })
    .catch(function (error) {
        // handle error
        console.log(error);
      })
})

router.get('/logout', (req,res,next)=>{
    res.clearCookie('x-auth-token');
    res.redirect('/login');
})
module.exports = router;