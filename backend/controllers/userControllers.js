
import User from "../models/user.js";
import {hashPassword,checkPassword} from "../services/hashing.js"
import { setUserToken } from "../services/auth.js";

export const   handleUserSignUp = async(req,res) =>{
        var {username , password ,email,profilePic} = req.body;
        console.log(username)
        if(!username || !password || !email ) res.status(400).json({response :"Enter all required fields"});
        try{
            password = await hashPassword(password);
             var data = {
                username : username,
                password : password,
                email : email,
             }
             if(profilePic){
                    data.profilePic = profilePic;
             }
             console.log(data);
             const result = await User.create(data);
             
             if(!token) return res.status(500).json({response : "error while setting token"})
             
             res.status(200).json({response:"successfully user Signed In and token generated"});
        }catch(err){
              console.error("error while handling user signup :",err);
        }

}

export const handleUserLogin = async (req,res) =>{
             const {username , password} = req.body;
             
             if(!username || !password  ) res.status(400).json({response :"Enter all required fields"});
             try{
                 const dataObtained = await User.findOne({username : username});
                 if(!dataObtained) return res.status(401).json({response:"wrong credentials"});
                 
                 
                 const isPasswordCorrect = checkPassword(password,dataObtained.password);
                 
                 if(!isPasswordCorrect) return res.status(401).json({response:"wrong credentials"});
                 const token = setUserToken(dataObtained);
                 if(!token) return res.status(500).json({response : "error while setting token"})
                
                
                 return res.status(200).json({response: `successfully Login In token set` ,
                                               token : token });
             }
             catch(err){
                  console.log("error while handling user login : ",err);
             }
    
}