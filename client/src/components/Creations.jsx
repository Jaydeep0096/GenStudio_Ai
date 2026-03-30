import React, { useState } from 'react'

import Markdown from 'react-markdown'
// import rehypeKatex from 'rehype-katex'
// import remarkMath from 'remark-math'


const Creations = ({item}) => {
    const [expanded, setExpanded] = useState(false);

    const markdown = item.content;

  return (
    <div onClick={()=>setExpanded(!expanded)} className='p-4 max-w-5xl text-sm bg-white border border-gray-200 rounded-lg cursor-pointer'>
        <div className='flex justify-between items-center gap-4'>
            <div>
                <h2>{item.prompt}</h2>
                <p className='text-gray-500'>{item.type} - {new Date(item.created_at).toLocaleDateString()}</p>
            </div>
            <button className='bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] px-4 py-1 rounded-full'>
                {item.type}
            </button>
        </div>

        {
            expanded && (
                <div className='reset-tw'>
                    {
                        item.type === 'image' ? (
                            <div>
                                <img src={markdown} alt='image' className='mt-3 w-full max-w-md' />
                            </div>
                        ) : (
                        <div>
                            <Markdown>
                                {markdown}
                            </Markdown>   
                        </div>
                        )
                    }
                </div>
            )
        }

    </div>
  )
}

export default Creations
