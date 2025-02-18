import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
// import { removeFromPastes} from "../redux/PasteSlice";

import { NavLink } from "react-router";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaRegShareSquare } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";
import { fetchPaste , deletePaste } from "../redux/PasteSlice";
const Pastes = () => {
   const [searchBar,setSearchBar] = useState("");
   const { pastes , status , error } = useSelector((state)=> state.paste);
   console.log("pastes ",pastes);
   const dispatch = useDispatch()

   const filterData = pastes.filter((paste) => paste.title.toString().toLowerCase().includes(searchBar.toLowerCase()));
 

   const handleDeleteBtn= (pasteId)=>{
          
           dispatch(deletePaste(pasteId));
   }

  useEffect(() => {
    dispatch(fetchPaste())
  }, [dispatch])
  

   const convertDateFormat= (str)=>{
         const date = new Date(str)
         const options = {
          day:'2-digit',
          month:'long',
          year:'numeric'
         };
         const formattedDate = date.toLocaleString('en-GB',options);
         
        return formattedDate;

   }
  return (

      <>
    
          <div>
            <input className="border rounded-lg border-slate-500 p-2 w-full text-xl text-slate-600 mt-5"
            placeholder="Search here"
            value={searchBar}
            onChange={(e)=>setSearchBar(e.target.value)}
            />
          </div>
          <div className="border border-slate-500 mt-4 text-3xl   rounded-lg">
              <div className="border border-slate-500 text-3xl  p-3 flex justify-start rounded-t-lg">
                  My Pastes 
              </div>
              <div className="flex flex-col">{
                filterData.length  > 0 &&
                filterData.map((item) => {
                return (
                          <div className="border  border-slate-400 p-4 text-xl  justify-center border-solid  m-2 rounded-lg " key={item._id}>
                                <div className="flex flex-rows justify-between">
                                        <div>
                                            <div className="flex justify-start text-2xl">
                                                  {item.title}
                                            </div>
                                            <div className="flex justify-start">
                                                 <p className="text-sm line-clamp-2 ">
                                                       {item.content}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                                <div className="flex flex-row justify-center gap-2"> 

                                                      <button className="border border-slate-500 flex justify-center p-2 max-h-[40px] "
                                                      key="view" >
                                                        <NavLink to={`/paste/${item?._id}`}>
                                                        <FaEye className="text-black  hover:text-purple-600 "  />
                                                        </NavLink>
                                                      </button>
                                                      <button className="border border-slate-500 flex justify-center p-2 max-h-[40px] "
                                                      onClick={(e)=>handleDeleteBtn(item._id)}
                                                      key="del">
                                                      <MdOutlineDelete className="text-black  hover:text-red-600  " />
                                                      </button>
                                      
                                                        <button className="border border-slate-500 flex justify-center p-2 max-h-[40px] "
                                                        key="edit">
                                                            <NavLink to={`/?pasteId=${item?._id}`}> 
                                                            <CiEdit className="text-black  hover:text-blue-600   " />
                                                            </NavLink>
                                                        </button>
                                                        <button className="border border-slate-500 flex justify-center p-2 max-h-[40px] "
                                                        key="share">
                                                            <NavLink to={`/?pasteId=${item?._id}`}> 
                                                            <FaRegShareSquare  className="text-black  hover:text-orange-600 "/>

                                                            </NavLink>
                                                        </button>
                                                        <button className="border border-slate-500 flex justify-center p-2 max-h-[40px] "
                                                        key="copy">
                                                            <NavLink to={`/?pasteId=${item?._id}`}> 
                                                            <IoCopyOutline className="text-black  hover:text-green-600 "/>

                                                            </NavLink>
                                                        </button>
                                          
                                                </div>
                                                <div  className="mt-[2px] text-[15px] flex justify-end">
                                                      { convertDateFormat(item.createdAt.toString())}
                                                </div>
                                      </div>

                              </div>
                              
                      </div>
                )
                }
              )

            }
            {filterData.length === 0? 
            <div className="text-3xl font-semibold text-slate-400 ml-4 my-6">No Pastes</div>:
            <></>
              }
              </div>
          </div>
      </>
   )
}

export default Pastes