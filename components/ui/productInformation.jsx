import React from 'react'

const productInformation = ({ product, className }) => {
  const classes = className ? className : '';
  return (
    <>
      <div className={`${classes}`}>
        <p className="leading-[1.6] text-red-400 opacity-85 font-bold  text-3xl md:pl-10">
          Price: {product?.price} credits
        </p>
      </div>
      <div>
        <p className="leading-[1.6] text-slate-100 aeonik text-s md:pl-10 text-lg">
          {product?.description}
        </p>
      </div>
    </>
  )
}

export default productInformation