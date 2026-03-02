const redis = require("../config/cache");
const blacklistModel = require("../models/blacklist.model");
const userModel = require("../models/user.model");
const jwt = require('jsonwebtoken')


async function authUser(req,res,next) {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message :'Token not provided'
        })
    }

    //token blacklisting 
    const isTokenBlackListed = await blacklistModel.findOne({
        token
    })
    
    if(isTokenBlackListed){
        return res.status(401).json({
            message :'Invalid token'
        })
    }

    let decoded = null 
    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        next()
    }catch(err){
        return res.status(401).json({
            message :'Invalid token',
            err
        })
    }   
}
module.exports = {authUser}
