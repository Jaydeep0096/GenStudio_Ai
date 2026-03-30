import { Sparkle , Edit, Hash} from 'lucide-react';
import React, { useState } from 'react'

const BlogTitle = () => {

  const categoryItems = [
    {text:"General"},
    {text:"Technology"},
    {text:"Business"},
    {text:"Health"},
    {text:"Lifestyle"},
    {text:"Education"},
    {text:"Travel"},
    {text:"Food"}
  ]

  const [selectCategories, setSelectCategories] = useState(categoryItems[0]);
  const [blogInput, setBlogInput] = useState('');

    const submitHandlerBlog = async(e) =>{
      e.preventDefault();
      console.log(blogInput);
    }

  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      {/* left col onSubmit={}*/}
      <form onSubmit={submitHandlerBlog}  className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className='flex items-center gap-3'>
          <Sparkle className='w-6 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>AI Title Generator</h1>
        </div>

        <p className='mt-6 text-sm font-medium'>Keyword</p>
        <input
          onChange={(e)=> setBlogInput(e.target.value)}
          value={blogInput}
          type="text"
          className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300'
          placeholder='The future of artificial intelligence is...'
          required/>
        <p className='mt-4 text-sm font-medium'>Categories</p>

        <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11 grid grid-cols-3 gap-3'>
            {
              categoryItems.map((item, index) => (
                <span key={index} onClick={()=>setSelectCategories(item)} className={`text-center px-5 py-[1px] border rounded-full cursor-pointer ${selectCategories.text === item.text ? 'border border-blue-500 bg-blue-100' : 'text-gray-500 border-gray-300'}`}>
                  {item.text}
                </span>
              ))
            }
        </div>
        
        <button className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 transition-all duration-200 text-white px-4 py-2 mt-6 text-sm rounded-lg shadow-md hover:shadow-lg'>
          <Hash className='w-5' />
          Generate title
        </button>

      </form>

      {/* Right col */}
          <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>

            <div className='flex items-center gap-3'>
              <Hash className='w-5 h-5 text-[#4A7AFF]' />
              <h1 className='text-xl font-semibold'>Generated title</h1>
            </div>

            <div className='flex-1 flex justify-center items-center'>
              <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                <Hash className='w-9 h-9' />
                <p>Enter a topic and click “Generate title to get started</p>
              </div>
            </div>

          </div>
        <div>
      </div>
    </div>
  )
}

export default BlogTitle
