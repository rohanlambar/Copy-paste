import { useSelector } from "react-redux"
import { useParams } from "react-router"


const ViewPaste = () => {
   const  {id} = useParams()
   const allPastes = useSelector((state)=>state.paste.pastes)
   const target = allPastes.filter((item)=>item._id === id)[0]
   console.log("target in view paste",target);


  return (
    <>
    <div className="flex flex-row gap-4 place-content-between">
    <input 
        className="p-2 border border-solid border-slate-500 rounded-lg place-content-evenly mt-1"
        type="text"
        value={target.title}
        placeholder="Enter your title"
        disabled
        onChange={(e)=>setTitle(e.target.value)}
    />
   



    </div>
    <div >
    <textarea
        value={target.content}
        placeholder="Enter Content Here "
        onChange={(e)=>setValue(e.target.value)}
        rows={20}
        disabled
        className="p-2 border border-solid border-slate-500 rounded-lg  mt-4 w-full"
    />
    </div>
   </>
  )
}

export default ViewPaste