import { Scissors, Sparkle } from 'lucide-react'
import React, { useState } from 'react'

const RemoveObject = () => {

  const [input, setInput] = useState('');
  const [object, setObject] = useState('');

   const submitHandler = async(e) =>{
    e.preventDefault();
    // console.log(publish);
  }

  return (
   <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      {/* left col onSubmit={}*/}
      <form onSubmit={submitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className='flex items-center gap-3'>
          <Sparkle className='w-6 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Object Removal</h1>
        </div>

        <p className='mt-6 text-sm font-medium'>Upload Image</p>
        <input
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

        <p className='mt-6 text-sm font-medium'>Describe object name to remove</p>
          <textarea
          onChange={(e)=>setObject(e.target.value)}
          value={object}
          cols={10}
          rows={4}
          type="text"
          className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300'
          placeholder='eg: bottle or pen, Only single object name'
          required/>

        <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11 grid grid-cols-3 gap-3'>
          {
          
          }
        </div>
        <button className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 transition-all duration-200 text-white px-4 py-2 mt-6 text-sm rounded-lg shadow-md hover:shadow-lg'>
          <Scissors className='w-10' />
          Remove Object
        </button>
        
       
      </form>

      {/* Right col */}
          <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>

            <div className='flex items-center gap-3'>
              <Scissors className='w-5 h-5 text-[#4A7AFF]' />
              <h1 className='text-xl font-semibold'>Processed Image</h1>
            </div>

            <div className='flex-1 flex justify-center items-center'>
              <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                <Scissors className='w-9 h-9' />
                <p>Upload an image and click “Remove Object" to get started</p>
              </div>
            </div>

          </div>
        <div>
      </div>
    </div>
  )
}

export default RemoveObject
