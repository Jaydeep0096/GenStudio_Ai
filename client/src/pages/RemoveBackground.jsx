import { Eraser, Sparkle } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useAuth } from "@clerk/react";
import Markdown from "react-markdown";


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveBackground = () => {

    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState();
    
    const {getToken} = useAuth();

    const submitHandler = async(e) =>{
    e.preventDefault();
    try {

       setLoading(true);
     
       const formData = new FormData();
       formData.append('image', input);

       
      const {data} = await axios.post("/api/ai/remove-background", formData , 
        {
          headers: {Authorization: `Bearer ${await getToken()}`}
        }
      ); 

      if(data.success){
        setContent(data.content);
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
      
    }
    setLoading(false);
    
  }

  return (
     <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      {/* left col onSubmit={}*/}
      <form onSubmit={submitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className='flex items-center gap-3'>
          <Sparkle className='w-6 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Background Removal</h1>
        </div>

        <p className='mt-6 text-sm font-medium'>Upload Image</p>
        <input
          onChange={(e)=>setInput(e.target.files[0])}
            type="file"
            accept="image/*"
            className="block w-full text-sm text-gray-500 
                      file:mr-4 file:py-2 file:px-4 
                      file:rounded-lg file:border-0 
                      file:text-sm file:font-semibold 
                      file:bg-blue-50 file:text-blue-600 
                      hover:file:bg-blue-100 mt-2 border border-gray-100 rounded-lg"
                      
          />
          <div className='text-xs text-gray-400 mt-1'>
            Supports JPG, PNG, and other image formats
          </div>

        <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11 grid grid-cols-3 gap-3'>
          {
          
          }
        </div>
        <button disabled={loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 transition-all duration-200 text-white px-4 py-2 mt-6 text-sm rounded-lg shadow-md hover:shadow-lg'>
          
          {
            loading ? <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
            : <Eraser className='w-10' />
          }
          Remove Background
        </button>
        
       
      </form>

      {/* Right col */}
          <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>

            <div className='flex items-center gap-3'>
              <Eraser className='w-5 h-5 text-[#4A7AFF]' />
              <h1 className='text-xl font-semibold'>Processed Image</h1>
            </div>

            {
              !content ? (<div className='flex-1 flex justify-center items-center'>
              <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                <Eraser className='w-9 h-9' />
                <p>Upload an image and click “Remove background" to get started</p>
              </div>
            </div>) : (
              <div className='mt-3 h-full'>
                <img src={content} alt='image' className='h-full w-full' />
              </div>
            )
            }
          </div>
        <div>
      </div>
    </div>
  )
}

export default RemoveBackground
