const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')


router.get('/', (req,res,next)=>{
    res.redirect('/login');
});

router.get('/login',(req,res,next)=>{
    res.render('login',{pageTitle: "Login to sentiments Calculator", path: '/login'})
})

router.get('/register',(req,res,next)=>{
    res.render('register',{pageTitle: "Register", path: '/register'})
})

router.get('/dashboard',auth,(req,res,next)=>{
    
    res.render('dashboard',{pageTitle: "Dashboard", path: '/dashboard'})
})

router.get('/logout', (req,res,next)=>{
    res.clearCookie('x-auth-token');
    res.redirect('/login');
})
module.exports = router;