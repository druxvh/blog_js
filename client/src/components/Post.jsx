import React from 'react'

const Post = () => {
  return (
    <div className='ring max-h-48 my-5 flex gap-8 overflow-hidden'>
        <div className="ring ring-slate-800 min-h-40 min-w-60">
            <img src="https://images.unsplash.com/photo-1716929134918-d8ae82fee46e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMHx8fGVufDB8fHx8fA%3D%3D" alt="image" className='object-contain ' />
        </div>
        <div className="">
            <h2 className="text-2xl font-serif font-bold">Lorem ipsum dolor sit amet consectetur adipisicing elit consectetur adipisicing elit.</h2>
            <span className="text-xs text-slate-600 font-mono ">12:00:33</span>
            <p className="mt-3 text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic expedita, minus veritatis excepturi eveniet mollitia quidem animi illum optio pariatur quas unde.</p>
        </div>
    </div>
  )
}

export default Post