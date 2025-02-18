
// this middleware checks authentication of users

import expressAsyncHandler from "express-async-handler";
import { getUserToken } from "../services/auth.js"; 
const checkAuth =  expressAsyncHandler(async(req,res,next) => {
    if(req.headers.authorization && req.headers.authorization.startsWith('bearer')){
    try{
       const auth = req.headers['authorization'];
      
       const token = auth.split('bearer ')[1];
       

       if(!token) return res.status(401).json({response : "no token available in checkAuth function "});
       const user =  getUserToken(token);
      
       if(!user) return res.status(401).json({response : "no user found in token  in checkAuth function "})
       req.user = user;
       
       next();
    }catch(err){
        console.error("there is error in check auth : ",err)
    }
       }
    else {
        res.status(401).json({message : "not authorized in check auth"});
    }
})

export default checkAuth;