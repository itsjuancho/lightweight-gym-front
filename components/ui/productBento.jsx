import React from 'react'

const ProductBento = () => {
  const gradient = 'rounded-2xl bg-gradient-to-b from-slate-800'
  return (
    <div className='mt-16'>
    <span className='text-heading'>Other <span className='text-red-500'>Products</span></span>
      <div className='grid grid-cols-4 grid-rows-3 gap-5 p-5'>
        <div className={`${gradient} to-slate-900 row-span-1 col-span-2 p-4 h-64`}>placeholder</div>
        <div className={`${gradient} to-slate-900 row-span-1 col-span-1 p-4`}>placeholder</div>
        <div className={`${gradient} to-slate-900 row-span-2 col-span-1 p-4`}>placeholder</div>

        <div className={`${gradient} to-slate-900 row-span-2 col-span-1 p-4`}>placeholder</div>
        <div className={`${gradient} to-slate-900 col-span-2 h-64 p-4`}>placeholder</div>
        <div className={`${gradient} to-slate-900 h-64 p-4`}>placeholder</div>
        <div className={`${gradient} to-slate-900 col-span-2 h-64 p-4`}>placeholder</div>
    </div>
    </div>
  )
}

export default ProductBento