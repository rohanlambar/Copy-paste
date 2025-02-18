
import mongoose from "mongoose";

const connectionDb = async(url)=>{
        try{
            await mongoose.connect(url)
            console.log("successfully connection established ");
        }
        catch(err){
            console.log("error occured while establishing connection ",err);
        }

}

export default connectionDb