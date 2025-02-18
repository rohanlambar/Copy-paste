import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useSearchParams } from "react-router";
import { addToPaste , updateToPaste } from "../redux/PasteSlice";
import { useAppContext } from "../context/isLoginContext";



const Homepage = () => {
    const [title,setTitle] = useState('');
    const [value,setValue] = useState('');
    const [searchParams,setSearchParams] = useSearchParams();
    const {isLoginIn,setShowPopUp} = useAppContext()
    const pasteId = searchParams.get("pasteId");
   
    
    const dispatch = useDispatch();

    // defining createPaste function 
    useEffect(() => {
      const fetchPaste = async()=>{if(pasteId){
            try{
              console.log("inside effect")
              const response = await fetch('http://localhost:8000/paste/getPaste',{
              method: "POST",
              headers : {
                "Content-Type": "application/json",
                 "authorization":`bearer ${localStorage.getItem('jwt_token')}`
              },
              credentials: "include", // ✅ Allows cookies,
              body : JSON.stringify({
                  pasteId : pasteId,
              }),
            
            });
            const data = await response.json()
            console.log(data.paste.title)
            setTitle(data.paste.title);
            setValue(data.paste.content);
             }
            catch(err){
              console.log("error while getting specific paste ",err)

             }
      }}

      fetchPaste()
    }, [pasteId])
    
    const createPaste = ()=>{
      if(isLoginIn){

      const  paste = {
           title : title,
           content : value,  
           _id: pasteId || Date.now().toString(36),
           
        }

      if(pasteId){
// updating the paste 
       dispatch(updateToPaste(paste));

      } 
      else{
// creating the paste 
       dispatch(addToPaste(paste));
      }
       
      //after creation or updation 

      setTitle('')
      setValue('')
      setSearchParams({});
     }
     else (setShowPopUp(true));
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