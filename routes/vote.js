const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

router.get('/success',(req,res)=>{
    res.render('voteSuccess',{pageTitle: "voting successful", path: '/voteSuccess'})
})
router.get('/removed',(req,res)=>{
    res.render('voteremoved',{pageTitle: "vote removed", path: '/voteremoved'})
})
module.exports = router;