import { Image, Sparkle } from 'lucide-react'
import React, { useState } from 'react'

const GenerateImage = () => {

  const ImageItems = [
    {text: "Realistic"},
    {text: "Ghibli style"},
    {text: "Anime style"},
    {text: "Cartoon style"},
    {text: "Fantasy style"},
    {text: "Realistic style"},
    {text: "3D style"},
    {text: "Portrait style"},
  ]

  const [selectImageStyle, setSelectImageStyle] = useState(ImageItems[0]);
  const [imageInput, setImageInput] = useState('');
  const [publish, setPublish] = useState(false);

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
          <h1 className='text-xl font-semibold'>AI Image Generator</h1>
        </div>

        <p className='mt-6 text-sm font-medium'>Describe Your Image</p>
        <textarea
          onChange={(e)=>setImageInput(e.target.value)}
          value={imageInput}
          cols={10}
          rows={4}
          type="text"
          className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300'
          placeholder='Describe what you want to see in the image...'
          required/>
        <p className='mt-4 text-sm font-medium'>Style</p>

        <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11 grid grid-cols-3 gap-3'>
          {
            ImageItems.map((item, index) => (
              <span key={index} onClick={()=>setSelectImageStyle(item)} className={`text-xs px-4 py-1 border rounded-full cursor-pointer text-center ${selectImageStyle.text === item.text ? 'border border-blue-500 bg-blue-100' : 'text-gray-500 border-gray-300'}`}>
                {item.text}
              </span>
            ))
          }
        </div>
          
          <div className='my-6 flex items-center gap-2'>
            <label className='relative cursor-pointer'>
              <input type="checkbox" className='sr-only peer' onChange={(e)=>setPublish(e.target.checked)} checked={publish}/>
              <div className='w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition'></div>
              <span className='absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4'></span>
            </label>
            <p className='text-sm'>Make this image Public</p>
          </div>

        <button className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 transition-all duration-200 text-white px-4 py-2 mt-6 text-sm rounded-lg shadow-md hover:shadow-lg'>
          <Image className='w-5' />
          Generate Image
        </button>
        

      </form>

      {/* Right col */}
          <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>

            <div className='flex items-center gap-3'>
              <Image className='w-5 h-5 text-[#4A7AFF]' />
              <h1 className='text-xl font-semibold'>Generated Image</h1>
            </div>

            <div className='flex-1 flex justify-center items-center'>
              <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                <Image className='w-9 h-9' />
                <p>Enter a topic and click “Generate Image" to get started</p>
              </div>
            </div>

          </div>
        <div>
      </div>
    </div>
  )
}

export default GenerateImage
