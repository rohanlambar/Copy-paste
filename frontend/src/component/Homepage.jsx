import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useSearchParams } from "react-router";
import { addToPastes } from "../redux/pasteSlice";



const Homepage = () => {
    const [title,setTitle] = useState('');
    const [value,setValue] = useState('');
    const [searchParams,setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();
    // defining createPaste function 
    const createPaste = ()=>{
      
      const  paste = {
           title : title,
           content : value,
           _id: pasteId || Date.now().toString(36),
           createdAt : new Date().toISOString(),
        }

      if(pasteId){
// updating the paste 
       dispatch(updateToPastes(paste));

      } 
      else{
// creating the paste 
       dispatch(addToPastes(paste));
      }
       
      //after creation or updation 

      setTitle('')
      setValue('')
      setSearchParams({});
     
    }


  return (
    <div className="w-full" >
         <div className="flex flex-row justify-between items-center gap-5 mt-5 ">
              <input 
                  className="flex-1 p-2 border border-solid border-slate-500 rounded-lg "
                  type="text"
                  value={title}
                  placeholder="Enter your title"
                  onChange={(e)=>setTitle(e.target.value)}
              />
              <button 
                  className={pasteId?"rounded-lg bg-blue-400  p-3":"rounded-lg bg-green-400  p-3 "}
                  onClick={createPaste}
              >
              { pasteId?"Update My Paste": "Create My Paste"}
              </button>



        </div>
        <div >
                <textarea
                    value={value}
                    placeholder="Enter Content Here "
                    onChange={(e)=>setValue(e.target.value)}
                    rows={20}
                    className="p-2 border border-solid border-slate-500 rounded-lg  mt-4 w-full "
                />
        </div>
   </div >
  )
}

export default Homepage