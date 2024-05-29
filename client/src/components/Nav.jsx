import React from 'react'


const Nav = () => {
  return (
    <div className='flex justify-between items-center'>
        <span className='text-2xl font-bold font-serif'>Write It.</span>
        <div className='flex gap-2'>
            <button className='bg-blue-500 border-blue-500 hover:bg-blue-600 text-white font-semibold py-1.5 px-4 border rounded'>Login</button>
            <button className='border-blue-500 text-blue-500 hover:text-blue-600 hover:border-blue-600 font-semibold py-1.5 px-4 border rounded'>Sign Up</button>
        </div>
    </div>
  )
}

export default Nav