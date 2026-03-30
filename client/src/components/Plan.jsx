import React from 'react'
import { PricingTable } from '@clerk/react'

const Plan = () => {
  return (
    <div className='max-w-2xl mx-auto z-20 my-30'>
        <div className='text-center'>
            <h2 className='text-slate-700 text-[42px] font-semibold'>
            Choose Your Plan
            </h2>
            <p className='text-gray-500 max-w-lg mx-auto'>
            Start for free and scale up as you grow. Find the perfect plan for your content creation needs.
            </p>
        </div>

        <div className='mt-14 mx-sm:mx-8'>
            <PricingTable appearance={{
            // variables: {
            //   colorPrimary: "#22c55e",
            //   colorBackground: "white",
            //   colorText: "#ffffff",
            //   colorTextSecondary: "#cbd5e1",
            //   borderRadius: "12px",
            // },
            // elements: {
            //   card: {
            //     backgroundColor: "#0f172a",
            //     border: "1px solid #1e293b",
            //     boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
            //   },
            //   formButtonPrimary: {
            //     backgroundColor: "#22c55e",
            //     color: "#ffffff",
            //   },
            // },
      }}/>
        </div>
    </div>
  )
}

export default Plan
