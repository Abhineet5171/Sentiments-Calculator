const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

router.get('/success',(req,res)=>{
    res.statusMessage("VOTE WAS SUCCESSFUL");
    res.redirect("/dashboard")
})






module.exports = router;