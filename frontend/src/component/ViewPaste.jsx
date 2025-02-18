import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { fetchPaste } from "../redux/PasteSlice"
import { useEffect } from "react"

const ViewPaste = () => {
   const  {id} = useParams()
   const dispatch = useDispatch()

  
   const { pastes , status , error } = useSelector((state)=>state.paste)
   
  
   const target = pastes.filter((item)=>item?._id === id)[0]
   
   useEffect(() => {
    dispatch(fetchPaste());
  }, [dispatch])
  return (
    <>
    <div className="flex flex-row gap-4 place-content-between">
    <input 
        className="p-2 border border-solid border-slate-500 rounded-lg place-content-evenly mt-1"
        type="text"
        value={target?.title}
        placeholder="Enter your title"
        disabled
       
    />
   



    </div>
    <div >
    <textarea
        value={target?.content}
        placeholder="Enter Content Here "
        
        rows={20}
        disabled
        className="p-2 border border-solid border-slate-500 rounded-lg  mt-4 w-full"
    />
    </div>
   </>
  )
}

export default ViewPaste