
// this service give services of hashing a password to increase security 

import bcrypt from 'bcrypt'

export const hashPassword = async (password)=>{
            try{ 
                const hashedPassword = await bcrypt.hash(password,1);
                return hashedPassword;
            }catch(err){
                console.error("error while hashing password :",err);
            }
            
}

export const checkPassword = async (receivedPassword , storedPassword) => {
       var isPasswordCorrect = false;
    try{
             isPasswordCorrect = await bcrypt.compare(receivedPassword,storedPassword);
            
    } catch(err){
            console.error("error while checking password : ",err)
    } finally {
        return isPasswordCorrect;
    }
            
}