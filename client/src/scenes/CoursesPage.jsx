import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import coursepic from '../images/infocourse.jpeg'

const CousesPage = () => {
  return (
    <div>
      <Navbar />
      <div className='h-screen container'>
        <img src={coursepic} alt="coursepic" className=' pt-20 h-[50%]' />
        <p className='pt-20'>Course Title</p>
        <p>Course Description: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus nam ex saepe magnam dignissimos molestias debitis officiis sint tempore, distinctio odio obcaecati reiciendis facere neque eum labore suscipit. Rem, necessitatibus.</p>
        <div className='lg:max-w flex '>
                    <a href="/" class="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-indigo-600 text-indigo-600 ">
                    <span className="absolute inset-0 bg-indigo-600 transition-all duration-500 ease-in-out transform origin-left scale-x-0 group-hover:scale-x-100"></span>
                        <span class="relative text-indigo-600 transition duration-300 group-hover:text-white ease tracking-wider"> Enroll </span>
                        
                    </a>
                </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default CousesPage