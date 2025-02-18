import React, { useState } from 'react'
import { assets  } from '../assets/assets'
import { NavLink } from 'react-router';
import { useAppContext } from '../context/isLoginContext';
import toast from 'react-hot-toast';
const Loginpopup = () => {
const {setShowPopUp,setLoginIn} = useAppContext()
const [username,setUsername] = useState('');
const [password,setPassword] = useState('');


const sendLoginDataToServer = async (e)=>{
       e.preventDefault(); // Prevent page reload
       try {
         const response = await fetch("http://localhost:8000/login",{
          method: "POST",
          headers : {
            "Content-Type": "application/json",
          },
          credentials: "include", // ✅ Allows cookies
          body : JSON.stringify({
              username : username,
              password : password,
          }),
        });
        const data = await response.json();

        
        if(response.ok){
          toast.success("successfully login in ");
          localStorage.setItem("jwt_token",data.token);
          setLoginIn(true);
          setShowPopUp(false);
          
        }
        else{
            
             toast.error("not able to log in ")
        }
        setPassword('')
        setUsername('')
      }
      catch(err){
            
            console.error("error occured while send login data to server : ",err);
      }
}
  return (
    <div className=' fixed inset-0 z-[10] flex justify-center  w-full h-full bg-[rgba(54,48,48,0.89)]'>
            <form className=' place-self-center rounded-lg px-6 py-2  shadow-2xl bg-white   max-w-[max(30vw,400px)]'
            onSubmit={(e) => sendLoginDataToServer(e)}>
                    <div className=' flex flex-col items-center gap-4 '>
                                <div className='relative flex flex-col justify-center items-center gap-1  p-4' >
                                            <img src={assets.logo} className='w-[150px] my-2 '/>
                                            <img src={assets.cross_icon}
                                              onClick={ ()=>setShowPopUp(false) }
                                            className='absolute top-0 right-0 rounded-[50%] hover:bg-slate-200 p-2 text-center'
                                            />
                                            <h1 className='text-xl font-medium'>Welcome back</h1>
                                            <p className='text-[var(--gray)]  text-xl'>Please enter your data to sign in. </p>
                                </div>  
                                <div className='w-full  flex flex-row justify-between gap-2'>
                                           <button 
                                           className='flex flex-1 justify-center border border-slate-300 px-4 py-1 rounded-lg mx-2'>
                                                    <img src={assets.google_logo}
                                                    className='w-[30px] h-[30px]'/>
                                           </button>
                                           <button
                                           className='flex flex-1 justify-center border border-slate-300 px-4 py-1 rounded-lg mx-2'>
                                           <img src={assets.facebook_logo}
                                           className='w-[25px] h-[25px]'/>

                                           </button>
                                </div>
                                <div className='flex flex-col justify-start gap-2 w-full'>
                                            <label>username</label>
                                            <input placeholder='Enter your username' 
                                            className='border  border-slate-400  w-full rounded-lg p-2 '
                                            value={username}
                                            onChange={(e)=>setUsername(e.target.value)}

                                            />
                                            <label >Password</label>
                                            <input type='password' 
                                            placeholder='password' 
                                            value={password}
                                            onChange={(e)=>setPassword(e.target.value)}

                                            className='border border-slate-400 w-full rounded-lg p-2 '
                                            />
                                </div>            
                                    <div className='flex flex-row justify-between w-full'>
                                        <div className='flex item-center'>
                                            <input type='checkbox'
                                             className='mx-2 accent-[var(--primary-color)]'/>
                                            <label>remember me</label>
                                        </div>  
                                        <p className='text-[var(--gray)] hover:underline hover:text-slate-500 cursor-pointer'>forgot password?</p>  

                                    </div>
                                    <button type='submit' className='p-2 bg-[var(--primary-color)] outline-none rounded-lg text-white w-full  hover:bg-[#272eb0] mb-2' > 
                                        Login </button>
                                    <p className='text-[var(--gray)] mb-4'>Create a new account? 
                                      <span className='text-[var(--primary-color)] text-sm font-bold cursor-pointer hover:underline'>
                                      <NavLink to='/signup'
                                      >Sign Up </NavLink> 
                                        </span></p>
                    </div>
            </form>
    </div>
  )
}

export default Loginpopup;

