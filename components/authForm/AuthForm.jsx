import React from 'react'
import "../../app/globals.css";

function AuthForm({title}) {
  return (
    <div className='bg-black'>
      <h1 className='text-white text-style-coanda-trial'>
     
        <span className='text-white'>{title}</span>
        <span className="text-purple"> Lightweight</span>
      </h1>
      <img src={logo} alt="Logo"/>
    </div>
  )
}

export default AuthForm