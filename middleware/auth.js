const jwt = require('jsonwebtoken');
const config = require('config');

module.exports =  (req,res, next)=>{
    //checks if we have the token stored in our cookie
    const token = req.cookies['x-auth-token'];
    
    //check if no token
    if(!token){
        // return res.status(401).json({msg:"NO TOKEN, authorisation denied"});
        return res.redirect('/login');
    }
    //verify token
    try {
        const decoded =jwt.verify(token,config.get('jwtToken'));
        req.user = decoded.user;
        next();
    }catch(err){
        res.status(401).json({msg:'token is not valid'});
    }
    
}