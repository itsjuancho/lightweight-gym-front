import React from 'react'

const QuantitySelector = ({quantity, changeQuantity}) => {
  return (
    <div className="flex items-center pl-10">
      <button onClick={() => changeQuantity(-1)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 12h14"
          />
        </svg>
      </button>
      <span className="mx-2 w-16 text-center py-2 bg-red-500 bg-opacity-70 text-xl font-semibold">
        {quantity}
      </span>
      <button onClick={() => changeQuantity(1)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
    </div>
  )
}

export default QuantitySelector