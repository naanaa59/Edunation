import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroSection from '../components/HeroSection'
import course1 from '../images/infocourse.jpeg'
import { Link } from 'react-router-dom'

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  
  useEffect(() => {
    fetch('http://0.0.0.0:5003/courses')
       .then(response => response.json())
       .then(coursesData => {
         console.log('Fetched Courses:', coursesData);
         setCourses(coursesData);
       })
       .catch(error => console.error('Error:', error));
   }, []);
  return (
    <div>
      <Navbar />
      <HeroSection />
      <div className=''>
      <p className='gothic flex flex-col lg:flex-row justify-center items-center text-3xl py-6'>Available Courses</p>
      <div className='flex flex-col lg:flex-row justify-center'>
              <div className='grid grid-cols-1 lg:grid-cols-4 gap-4  p-6'>
              {courses.map((course, index) => (
                  <div key={index} className='bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105'>
                  <img
                    src={course1}
                    alt='Team Member 1'
                  />
                    <div className='p-4'>
                      <Link to={`/courses/${course.id}`} className='text-xl font-semibold mb-2'>{course.title}</Link>
                      <p className='text-gray-700'>{course.description}</p>
                    </div>
                  </div>
              ))}                
              </div>
            </div>
      </div>
      <Footer />
    </div>
    
  )
}

export default HomePage