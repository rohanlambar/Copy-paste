import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/isLoginContext';
import toast from 'react-hot-toast';


const Navbar = () => {
  const {isLoginIn ,setShowPopUp , setLoginIn} = useAppContext();
  const toggleStatus = ()=>{
     if(!isLoginIn){
      
      setShowPopUp(true);
     
     }
     else{
      localStorage.removeItem('jwt_token');
      setLoginIn(false);
      toast.success("logged out successfully ")
     }
  }
  const checkLogin = (e)=>{
   if(!isLoginIn){
      e.preventDefault();
      setShowPopUp(true);}
  }
  return (
     
     <div className='flex flex-row justify-between items-center p-4 '>
        <img src={assets.logo} alt='Logo of Cafe' className='w-[150px] cursor-pointer' />
        {/* This is the middle section */}
        <div className='hidden md:block'>
             <ul className='flex flex-row gap-4 text-lg text-[var(--dark)] cursor-pointer'>
                <li>
                <NavLink to='/'
                
                className = {({isActive}) => isActive ? "text-[var(--primary-color)] pb-1 border-b-2 transition-all duration-200 border-[var(--primary-color)]":" "}              
                >
                Home 
                </NavLink>
                </li>
                <li>
                <NavLink to='/pastes'
                className = {({isActive}) => isActive ? "text-[var(--primary-color)] pb-1 border-b-2 transition-all duration-200 border-[var(--primary-color)]":" "}
                onClick={(e) =>checkLogin(e)}              
                >
                My Paste 
                </NavLink>
                </li>
               
               
               
             </ul>
        </div>
        {/* This is the right section */}
        <div className='flex flex-row gap-[40px] items-center cursor-pointer'>
          
          
          <button
           className=' border border-[var(--primary-color)] text-[var(--primary)] bg-transparent text-[16px] py-[10px] px-[30px] rounded-[50px] cursor-pointer hover:bg-[#3945f0] hover:text-white transition-all duration-300'
           onClick={toggleStatus} 

           >{ isLoginIn && "Sign Out"   || "Sign Up"}</button>
        </div>
    </div>

  )
}

export default Navbar
