import React from 'react'
import {assets} from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { UserButton, SignUpButton, Show } from '@clerk/react'


const Navbar = () => {
    const navigate = useNavigate();
    // const {user} = useUser;
    // const {openSignIn} = useClerk;


  return (
    <div className='fixed z-5 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32'>
        <div onClick={() => navigate('/')} className='flex items-center gap-0.5 cursor-pointer'>
          <img src={assets.logo} alt="logo" className='w-5 h-10 object-contain sm:w-44' />
          <h3 className='text-2xl font-bold hover:text-primary/70 text-primary'>GenStudio.ai</h3>
        </div>
        <div className='flex items-center gap-4'>
        <Show when="signed-out">
          <SignUpButton mode="modal">
            <button className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5'>
              Get Started <ArrowRight className='w-4 h-4' />
            </button>
          </SignUpButton>
        </Show>

        <Show when="signed-in">
          <UserButton />
        </Show>
      </div>
    </div>
  )
}

export default Navbar
