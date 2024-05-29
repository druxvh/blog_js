import React from 'react'

const Post = () => {
  return (
    <div className='ring max-h-48 flex gap-8 overflow-hidden'>
        <div className="w-1/3">
            <img src="https://images.unsplash.com/photo-1715179067049-ddadb5f0c985?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyOXx8fGVufDB8fHx8fA%3D%3D" alt="image" className='object-contain' />
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