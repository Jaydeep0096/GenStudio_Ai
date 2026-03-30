import React, { useState } from 'react'
import {FileText, Sparkle} from 'lucide-react'

const ReviewResume = () => {

  const [input, setInput] = useState('');

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
          <h1 className='text-xl font-semibold'>Resume Review</h1>
        </div>

        <p className='mt-6 text-sm font-medium'>Upload Resume</p>
        <input
          onChange={(e)=>setInput(e.target.file[0])}
          value={input}
          type="file"
          accept="application/pdf"
          className="block w-full text-sm text-gray-500 
                    file:mr-4 file:py-2 file:px-4 
                    file:rounded-lg file:border-0 
                    file:text-sm file:font-semibold 
                    file:bg-blue-50 file:text-blue-600 
                    hover:file:bg-blue-100 border border-gray-100 rounded-lg mt-2"
        />
          <div className='text-xs text-gray-400 mt-1'>
            Supports PDF resume only.
          </div>

        <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11 grid grid-cols-3 gap-3'>
          {
          
          }
        </div>
        <button className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 transition-all duration-200 text-white px-4 py-2 mt-6 text-sm rounded-lg shadow-md hover:shadow-lg'>
          <FileText className='w-10' />
          Review Resume
        </button>
        
       
      </form>

      {/* Right col */}
          <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>

            <div className='flex items-center gap-3'>
              <FileText className='w-5 h-5 text-[#4A7AFF]' />
              <h1 className='text-xl font-semibold'>Analysis Results</h1>
            </div>

            <div className='flex-1 flex justify-center items-center'>
              <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                <FileText className='w-9 h-9' />
                <p>Upload a resume and click “Review Resume" to get started</p>
              </div>
            </div>

          </div>
        <div>
      </div>
    </div>
  )
}

export default ReviewResume
