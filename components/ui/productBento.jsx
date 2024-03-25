import Link from 'next/link'
import React from 'react'

const ProductBento = () => {
  const gradient = 'rounded-2xl bg-gradient-to-b from-slate-800'
  return (
    <div className='mt-16 cursor-pointer'>
    <span className='text-heading'>Other <span className='text-red-500'>Products</span></span>
      <div className='grid grid-cols-4 grid-rows-3 gap-5 p-5'>
        <div className={`transition-all ease-in-out duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-red-500 hover:z-50 relative ${gradient} to-slate-900 row-span-1 col-span-2 p-4 h-64`}>
          <h1 className='text-3xl font-bold'>Anabolic Muscle Builder</h1>
          <p className='text-2xl'>Killer deal! Buy <b className='text-red-500'>two for the price of one</b></p>
          <span className='absolute bottom-4 right-4 text-8xl text-red-500 font-black'>2X1</span>
        </div>

        <div className={`transition-all ease-in-out duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-red-500 hover:z-50 relative ${gradient} to-slate-900 row-span-1 col-span-1 p-4 overflow-hidden`}>
          <h1 className='text-3xl font-bold'>SSN Creatine</h1>
          <b className='text-red-500 text-2xl'>40% OFF</b>
          <img src='https://ssnindia.com/wp-content/uploads/2023/03/SSN_Creatine_300g_-.1-600x600.png' className='z-10 h-64 absolute -right-24 bottom-0' />
        </div>
        <div className={`transition-all ease-in-out duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-red-500 hover:z-50 ${gradient} to-slate-900 row-span-2 col-span-1 overflow-hidden`}>
          <img 
          className='w-full h-full contrast-150 saturate-50'
          src='https://images.unsplash.com/photo-1584863495140-a320b13a11a8?q=80&w=2773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          />
        </div>

        <div className={`transition-all ease-in-out duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-red-500 hover:z-50 ${gradient} to-slate-900 row-span-2 col-span-1 overflow-hidden`}>
          <img 
          className='w-full h-full object-cover contrast-125 saturate-50'
          src='https://images.unsplash.com/photo-1583969430754-a4ca5030bb21?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          />
        </div>
        <div className={`hover:z-50 col-span-2 h-64 p-4 grid place-content-center coanda-bold text-8xl`}>Lightweight</div>
        <div className={`transition-all ease-in-out duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-red-500 hover:z-50 relative ${gradient} to-slate-900 h-64 p-4 overflow-hidden flex flex-col`}>
          <img
            src='https://ssnindia.com/wp-content/uploads/2023/03/NO2_Rage_225g-BERRY-BLAST_-.1-1-600x600.png'
            className='absolute h-64 bottom-0 -left-24'
          />
          <h1 className='text-3xl font-bold text-right'>NO 2 Rage Pre Workout</h1>
          <b className='text-red-500 text-2xl text-end w-full'>50% OFF</b>
        </div>
        <div className={`transition-all ease-in-out duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-red-500 hover:z-50 ${gradient} to-slate-900 col-span-2 h-64 p-4 coanda grid place-content-center`}>
        <Link
                href="/products"
                className="text-6xl font-semibold group transition duration-300 animate-fade-in hover:text-red-500"
              >
                Check out more
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-[2px] bg-red-500"></span>
              </Link>
        </div>
    </div>
    </div>
  )
}

export default ProductBento