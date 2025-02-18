import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

export const  fetchPaste = createAsyncThunk("PasteSlice/fetchPaste",
    async (_,{rejectWithValue})=>{
        try {
            const  response = await fetch("http://localhost:8000/paste",{
                method: "GET",
                headers : {
                  "Content-Type": "application/json",
                   "authorization":`bearer ${localStorage.getItem('jwt_token')}`
                },
                credentials: "include", // ✅ Allows cookies
              });
              if(!response.ok) throw new Error('error while fetch data from /paste');
              const data = await response.json()
              return data;
        }
        catch(err){
            console.error("error occured while fetching intially all pastes ",err);
            return rejectWithValue(err.message)
            
        }
    }
);


export const  addToPaste = createAsyncThunk("PasteSlice/addToPaste",
    async (paste , {rejectWithValue})=>{
        try {
            const  response = await fetch("http://localhost:8000/paste/createPaste",{
                method: "POST",
                headers : {
                  "Content-Type": "application/json",
                   "authorization":`bearer ${localStorage.getItem('jwt_token')}`
                },
                credentials: "include", // ✅ Allows cookies,
                body : JSON.stringify({
                    title : paste.title  ,
                    content :paste.content ,
                }),

              });
              if(!response.ok) throw new Error('error while fetch data from /paste');
              const data = await response.json()
              return data;
        }
        catch(err){
            console.error("error occured while fetching intially all pastes ",err);
            return rejectWithValue(err.message)
        }
    }
);

export const updateToPaste = createAsyncThunk("PasteSlice/updateToPaste",
    async(paste ,{rejectWithValue}) => {
        try {
            const  response = await fetch("http://localhost:8000/paste/updatePaste",{
                method: "POST",
                headers : {
                  "Content-Type": "application/json",
                   "authorization":`bearer ${localStorage.getItem('jwt_token')}`
                },
                credentials: "include", // ✅ Allows cookies,
                body : JSON.stringify({
                    title : paste.title  ,
                    content :paste.content ,
                    pasteId : paste._id,
                }),

              });
              if(!response.ok) throw new Error('error while fetch data from /paste');
              const data = await response.json()
              return data;
        }
        catch(err){
            console.error("error occured while fetching intially all pastes ",err);
            return rejectWithValue(err.message)
        }
    }
);


export const deletePaste = createAsyncThunk("PasteSlice/deletePaste",
    async(pasteId ,{rejectWithValue}) => {
        try {
            const  response = await fetch("http://localhost:8000/paste/deletePaste",{
                method: "POST",
                headers : {
                  "Content-Type": "application/json",
                   "authorization":`bearer ${localStorage.getItem('jwt_token')}`
                },
                credentials: "include", // ✅ Allows cookies,
                body : JSON.stringify({
                    pasteId :pasteId,
                }),

              });
              if(!response.ok) throw new Error('error while fetch data from /paste');
              const data = await response.json()
              return data.paste;
        }
        catch(err){
            console.error("error occured while fetching intially all pastes ",err);
            return rejectWithValue(err.message)
        }
    }
);


const PasteSlice =  createSlice({
    name:'paste',
    initialState:{
        pastes: [],
        status : "idle",
        error : null,
        toast_id : null,
    },
    reducers:{
       
    },
    extraReducers : (builder) => {
        builder 
                .addCase(fetchPaste.pending , (state)=>{
                         state.status = "loading";
                        //  state.toast_id = toast.loading("fetching pastes...")
                })
                .addCase(fetchPaste.fulfilled , (state,action)=>{
                        state.pastes = action.payload;
                        state.status = "succeded";
                        if(state.toast_id) toast.dismiss(state.toast_id)
                        toast.success("pastes fetched");

                })
                .addCase(fetchPaste.rejected , (state,action)=>{
                         state.status = "failed";
                         state.error = action.error.message;
                        if(state.toast_id) toast.dismiss(state.toast_id)
                           
                         toast.error("error while fetching pastes");
                })

                 .addCase(addToPaste.pending,(state)=>{
                    state.status = "loading";
                    state.toast_id = toast.loading("uploading pastes...");
                 })   
                 .addCase(addToPaste.fulfilled,(state,action)=>{
                         
                        state.status = "succeded";
                        if(state.toast_id) toast.dismiss(state.toast_id)

                        toast.success("pastes uploaded");
                 })        
                 .addCase(addToPaste.rejected,(state,action)=>{
                    state.status = "failed";
                    state.error = action.error.message;
                    if(state.toast_id) toast.dismiss(state.toast_id)

                    toast.error("error while uploading paste");
                 })  
                 .addCase(updateToPaste.pending,(state)=>{
                    state.status = "loading";

                    state.toast_id = toast.loading("uploading pastes...");
                 })   
                 .addCase(updateToPaste.fulfilled,(state,action)=>{
                         
                        state.status = "succeded";
                        if(state.toast_id) toast.dismiss(state.toast_id)

                        toast.success("pastes updated");
                 })        
                 .addCase(updateToPaste.rejected,(state,action)=>{
                    state.status = "failed";
                    state.error = action.error.message;
                    if(state.toast_id) toast.dismiss(state.toast_id)

                    toast.error("error while updating  paste");
                 })  
                 .addCase(deletePaste.pending,(state)=>{
                    state.status = "loading";

                    state.toast_id = toast.loading("deleting  pastes...");
                 })   
                 .addCase(deletePaste.fulfilled,(state,action)=>{
                         
                        state.status = "succeded";
                        if(state.toast_id) toast.dismiss(state.toast_id)
                        state.pastes = state.pastes.filter((item) => item._id !== action.payload._id);
                        console.log(state.pastes)
                        
                        toast.success("pastes deleted");
                 })        
                 .addCase(deletePaste.rejected,(state,action)=>{
                    state.status = "failed";
                    state.error = action.error.message;
                    if(state.toast_id) toast.dismiss(state.toast_id)

                    toast.error("error while deleting  paste");
                 })     
    }
})




export default PasteSlice.reducer

