import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import coursepic from '../images/infocourse.jpeg'

const CousesPage = () => {
  return (
    <div>
      <Navbar />
      <div className='h-screen container'>
        <img src={coursepic} alt="coursepic" className=' pt-20 h-' />
        <p className='pt-20'>Course Title</p>
        <p>Course Description: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus nam ex saepe magnam dignissimos molestias debitis officiis sint tempore, distinctio odio obcaecati reiciendis facere neque eum labore suscipit. Rem, necessitatibus.</p>
      </div>
      <Footer />
    </div>
  )
}

export default CousesPage