import React, { useEffect, useState } from 'react'
import { dummyCreationData } from '../assets/assets';
import { Gem, Sparkle } from 'lucide-react';
import { Show } from '@clerk/react'
import Creations from '../components/Creations';
import axios from 'axios'
import toast from 'react-hot-toast';
import { useAuth } from "@clerk/react";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashbord = () => {

  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);

  const {getToken} = useAuth();

  const getDashbordData = async() =>{
    // setCreations(dummyCreationData);
    try {
      const {data} = await axios.get("/api/user/get-user-creations", 
        {
          headers: {Authorization: `Bearer ${await getToken()}`}
        }
      ); 

      if(data.success){
        // setCreations(data.setCreations);
          setCreations(Array.isArray(data.creations) ? data.creations : []);
      }else{
        toast.error(data.message)
      }
      console.log("DASHBOARD DATA:", data);
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  useEffect(() =>{
    getDashbordData();
  },[])

  return (
      <div className='h-full overflow-y-scroll p-6'>
        <div className='flex justify-start gap-4 flex-wrap'>

          {/* Total Creations Card */}
          <div className='flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200'>
            <div className='text-slate-600'>
              <p className='text-sm'>Total Creations</p>
              <h2 className='text-xl font-semibold'>{creations?.length}</h2>
            </div>
            <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center'>
              <Sparkle className='w-5 text-white ' />
            </div>
          </div>

          {/* Active Plan Card */}
          <div className='flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200'>
            <div className='text-slate-600'>
              <p className='text-sm'>Active Plan</p>
              <h2 className='text-xl font-semibold'>
                <Show className='text-xs text-gray-300' when={{ plan: 'premium' }} fallback={<p>Free</p>}>
                  Premium
                </Show> plan
              </h2>
            </div>
            <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] text-white flex justify-center items-center'>
              <Gem className='w-5 text-white ' />
            </div>
          </div>
        </div>

        {loading ? (
            (
              <div className='flex justify-center items-center h-full'>
                <span className='w-10 h-10 my-1 rounded-full border-3 border-primary border-t-transparent animate-spin'></span>
              </div>  
            )
          ) : (
            <div className='space-y-3'>
              <p className='mt-6 mb-4'>Recent Creations</p>
              {
                  creations?.map((item) => <Creations key={item.id} item={item} />)
              }
            </div>
          )}

        
      </div>
  )
}

export default Dashbord
