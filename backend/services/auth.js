
// this service deal with sending and getting jwt token 
import jwt from 'jsonwebtoken'
const jwtSecret = "rohan@123";
export const setUserToken  =   (user) => {
                const {username,email} = user;
                var result = null;
                const payload = {
                    username : username,
                    email : email,
                }
                try{
                    result =   jwt.sign(payload,jwtSecret);
                   
                }
                catch(err){
                    console.error("error while setting user token :",err);
                }
                finally{
                    return result;
                }
}

export const getUserToken = (token) => {
    try {
      return jwt.verify(token, jwtSecret); // ✅ No need for `await`
    } catch (err) {
      console.error("Error occurred while verifying user token:", err);
      return null; // Return `null` explicitly on error
    }
  };