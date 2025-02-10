
// this middleware checks authentication of users
import { response } from "express";
import { getUserToken } from "../services/auth.js"; 
const checkAuth = (req,res,next) => {
    try{
       const token = req.cookies?.jwt_token;
       if(!token) return res.status(401).json({response : "no token available"});
       const user = getUserToken(token);
       if(!user) return res.status(401).json({response : "no user found in token "})
       req.user = user;
       next();
    }catch(err){
        console.error("there is error in check auth : ",err)
    }
       
}

export default checkAuth;