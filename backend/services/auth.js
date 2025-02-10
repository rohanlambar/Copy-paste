
// this service deal with sending and getting jwt token 
import jwt from 'jsonwebtoken'
const jwtSecret = "rohan@123";
export const setUserToken  =  (user) => {
                const {username,email} = user;
                var result = null;
                const payload = {
                    username : username,
                    email : email,
                }
                try{
                    result =  jwt.sign(payload,jwtSecret);
                   
                }
                catch(err){
                    console.error("error while setting user token :",err);
                }
                finally{
                    return result;
                }
}

export const getUserToken = (token) => {
          var result = null;
           try{
            result = jwt.verify(token,jwtSecret);
            
           }
           catch(err){
            console.error("error occured while getting user token :",err);
           }
           finally{
            return result;
           }

}