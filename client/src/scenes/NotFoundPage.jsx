import React from 'react'
import { Link } from 'react-router-dom'
import error from '../images/404.png'

const NotFoundPage = () => {
  return (
    <div>
      <img src={error} alt="404" className='absolute
  top-0
  left-0
  w-full
  h-full
   '/>
      <div className='flex flex-col items-center justify-center h-screen backdrop-blur-sm bg-white/30 '>
        <h1 className='text-4xl font-bold mb-4'>Oops! You seem to be lost.</h1>
        <p className='text-gray-600 mb-8'>We understand your curiosity, but there are some limits.</p>
        <Link to="/" className='btn btn-primary'>Go back home</Link>
      </div>
    </div>
  )
}

export default NotFoundPage