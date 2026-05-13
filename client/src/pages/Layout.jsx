import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import {assets} from '../assets/assets'
import { Menu, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useUser, SignIn } from '@clerk/react';

const Layout = () => {

    const navigate = useNavigate();
    const [sidebar, setSidebar] = useState();
    const {user} = useUser();

  return user ? (
    <div className='flex flex-col items-start justify-start h-screen'>
        <nav className='w-full px-8 min-h-14 flex items-center justify-between border-b border-gray-200'>
            {/* <img src={assets.logo} className='cursor-pointer w-32 sm:w-44' alt="" onClick={() => navigate('/')} /> */}
            <div className='flex items-center gap-1 cursor-pointer'>
                <img src={assets.logo} alt="logo" className='w-10 h-10 object-contain sm:w-44 cursor-pointer' onClick={() => navigate('/')} />
                <h3 className='text-2xl font-bold hover:text-primary/70 text-primary'>GenStudio.ai</h3>
            </div>
            {
            sidebar ? <X onClick={()=>setSidebar(false)} className='w-6 h-6 text-gray-600 sm:hidden' /> 
                : <Menu onClick={()=>setSidebar(true)} className='w-6 h-6 text-gray-600 sm:hidden' />
            }
        </nav>

        <div className='flex-1 w-full flex h-[calc(100vh-64px)]'>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
            <div className='flex-1 bg-[#F4F7FB]'>
                <Outlet />
            </div>
        </div>
        
    </div>
  ) : (
    <div className='flex items-center justify-center h-screen'>
        <SignIn />
    </div>
  )
}

export default Layout
