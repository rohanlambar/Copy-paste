import {createSlice} from '@reduxjs/toolkit'
import toast from 'react-hot-toast';
const PasteSlice = createSlice({
    name:'paste',
    initialState:{
        pastes:localStorage.getItem("pastes")
        ?JSON.parse(localStorage.getItem("pastes"))
        :[]
       
    },
    reducers:{
       addToPastes:(state,action) => {
           // adding a check if parse exist 
            
            const paste = action.payload;
            if(paste.trim().length > 0 ) {
            state.pastes.push(paste);
            localStorage.setItem("pastes",JSON.stringify(state.pastes))
            toast.success('Paste Successfully created!')
          } else {
                toast.error('Title of paste empty')
            }
       },
       updateToPastes: (state,action)=>{
        const paste = action.payload;
        // get index 
        console.log("update slice pasteeID",paste._id)
        const index = state.pastes.findIndex((item)=>item._id === paste._id)
        console.log("index" , index)
        if(index >= 0){
            console.log("in final block ")
            state.pastes[index] = paste
            localStorage.setItem("pastes",JSON.stringify(state.pastes));
            toast.success("Paste updated")

        }

       },
       resetAllPastes :(state,action) =>{
         state.pastes = []
         localStorage.removeItem("pastes");
       },
       removeFromPastes:(state,action)=>{
         const pasteId = action.payload;
         console.log("paste id to be removed ",pasteId)
        //  state.pastes = state.pastes.filter((item) => item._id !== paste._id)
        const index = state.pastes.findIndex((item) => item._id === pasteId)
    
        if(index >= 0) {
         state.pastes.splice(index,1)
         localStorage.setItem("paste",JSON.stringify(state.pastes))
         toast.success("Paste Removed Successfully ")
        }
       },
    }
})

//creating action creators to each reducer function
export const {addToPastes,updateToPastes,resetAllPastes,removeFromPastes} = PasteSlice.actions

export default PasteSlice.reducer

