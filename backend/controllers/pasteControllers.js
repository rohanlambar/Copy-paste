import { TbWashDryP } from "react-icons/tb";
import Paste from "../models/paste.js"
import User from "../models/user.js";
import { MdCatchingPokemon } from "react-icons/md";
export const getAllPastes = async (req,res)=>{
      // get it using username 
      
      try{
            const {username } = req.user;
            const result = await User.findOne({username : username});
            const userId = result._id;
            const  allPastes = await Paste.find({createdBy : userId});
            
            return res.status(200).json(allPastes);
            
      }
      catch(err){
            console.error("there is error while finding pastes ",err);
            console.log("failure on all pastes");
            return  res.status(500).json({response : "there is error while finding pastes server error"})
      }
 
}

export const handleCreatePaste = async (req,res) => {

        const {title,content} = req.body;
        const {username } = req.user;
       
      try{
            const result = await User.findOne({username : username});
            const userId = result._id;
            const newPaste = {
                  title : title,
                  content : content,
                  createdBy : userId,
            }
            const output = Paste.create(newPaste);
            return res.status(200).json({response : "all successfully done with creating new paste"});
            
            }
      catch(err){
            console.error("error occured while creating a paste");
            return res.status(400).json({response : "error while creating a paste"});
      }
}

export const handleUpdatePaste = async(req,res)=>{
       
       const {title,content,pasteId} = req.body;
       
       const {username } = req.user;
       try{
            const result = await User.findOne({username : username});
            const userId = result._id;
             const newPaste = {
                  _id : pasteId,
                  title : title,
                  content : content,
                  createdBy : userId,
             }
            const output = await  Paste.findByIdAndUpdate(pasteId,newPaste, { new: true });
            res.status(200).json({message : "successfully done " , data : output});
       }
       catch(err){
           console.log("error occured while updating paste ",err)
           res.status(500).json({message : "error faced while updating psate "})
       }
}


export const getPaste = async(req,res)=>{
      const {pasteId} = req.body;
     
      try{
          const paste = await Paste.findById(pasteId);
          return res.status(200).json({paste : paste});

      }
      catch(err){
            console.log("error while get a specific paste :",err);
            return res.status(500).json({message : "error while get a specific paste :"})
      }
}


export const deletePaste = async(req,res)=>{
        const {pasteId} = req.body;
        try{
             const result = await  Paste.findByIdAndDelete(pasteId);
             return res.status(200).json({message : "successfully done deleting paste ",
                  paste : result,
             });
        }
        catch(err){
            console.log("error while get a deleting  paste :",err);
            return res.status(500).json({message : "error while deleting  paste :"})
        }
}