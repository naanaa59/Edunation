import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-4xl font-bold mb-4'>Oops! You seem to be lost.</h1>
      <p className='text-gray-600 mb-8'>The page you are lookin for doesn't exist.</p>
      <Link to="/" className='btn btn-primary'>Go back home</Link>
    </div>
  )
}

export default NotFoundPage