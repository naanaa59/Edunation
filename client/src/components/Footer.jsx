import React from 'react'
import {BsLinkedin} from 'react-icons/bs'
import {FaGithub} from 'react-icons/fa'
import { FaTwitter } from "react-icons/fa";
import logo from '../images/logo.png'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  const [subjects, setSubjects] = useState([]);
  useEffect(() => {
    fetch('http://0.0.0.0:5003/subjects')
       .then(response => response.json())
       .then(async (subjectsData) => {
         console.log('Fetched subjects:', subjectsData);
   
         // Fetch courses for each subject
         const subjectsWithCourses = await Promise.all(subjectsData.map(async (subject) => {
           const response = await fetch(`http://0.0.0.0:5003/subjects/${subject.id}/courses`);
           const courses = await response.json();
           return { ...subject, courses }; // Return a new object with courses added
         }));
   
         setSubjects(subjectsWithCourses);
       })
       .catch(error => console.error('Error:', error));
   }, []);
  return (
    <footer className='footer-bg mb-0 h-auto'>
      <div className=' flex flex-col lg:flex-row justify-center gap-24 py-20'>
        <div className='text-white gothic flex flex-col lg:w-3/12'>
          <div className='lg:text-3xl flex gap-2'>
            <img src={logo} alt="Logo" className='w-10 h-10' />
            <p>EduNation</p>
          </div>
          <p className='mt-6'>At EduNation, we're dedicated to democratizing access to high-quality education globally, empowering learners of all backgrounds and locations. Join us in our mission to transform lives through learning.</p>
        </div>
        <div className='text-white gothic flex flex-col lg:w-3/12'>
          <div className='lg:text-3xl'>Subjects</div>
          <ul className='mt-6'>

            {/* { SUBJECT1 } */}
            <li className='relative group'>
            {subjects.map((subject, index) => (
            <div key={index}>
                <p className='font-semibold mr-4 cursor-pointer hover:underline hover:duration-600'>{subject.name}</p>
                <ul>
                  {subject.courses.map((course, courseIndex) => (
                    <Link to={`/courses/${course.id}`}>
                    <li  key={courseIndex} className='pl-2'>
                      {course.title}
                    </li>
                    </Link>
                        ))}
                </ul>
            </div>
      ))}
            </li> 
          </ul>
        </div>
        <div className='text-white gothic flex flex-col  lg:w-3/12'>
          <div className='lg:text-3xl'>About</div>
          <ul className='mt-6'>
            <li >
              <Link to="/about">
              About Us
              </Link>
              </li>
            <li>Contact Us:</li>
            <li>
              <p className='mt-4'>Badr Annabi</p>
              <div className='flex flex-row gap-4 my-4'>
                <a href='https://www.linkedin.com/in/badr-annabi-a316a3192/' rel="noreferrer" target='_blank'><BsLinkedin className='w-8 h-8 hover:text-indigo-600 transition-colors duration-400 ease-in'/></a>
                <a href='https://github.com/Badr-Annabi' rel="noreferrer" target='_blank'><FaGithub className='w-8 h-8 hover:text-indigo-600 transition-colors duration-400 ease-in' /></a>
                <a href='https://twitter.com/annabi_badr' rel="noreferrer" target='_blank'> <FaTwitter className='w-8 h-8 hover:text-indigo-600 transition-colors duration-400 ease-in'/></a>
              </div>
              <p>Oumaima Naanaa</p>
              <div className='flex flex-row gap-4 my-4'>
                <a href='https://www.linkedin.com/in/oumaima-naanaa/' rel="noreferrer" target='_blank'><BsLinkedin className='w-8 h-8 hover:text-indigo-600 transition-colors duration-400 ease-in' /></a>
                <a href=' https://github.com/naanaa59' rel="noreferrer" target='_blank'><FaGithub className='w-8 h-8 hover:text-indigo-600 transition-colors duration-400 ease-in' /></a>
                <a href='https://twitter.com/naanaa_oumaima' rel="noreferrer" target='_blank'> <FaTwitter className='w-8 h-8 hover:text-indigo-600 transition-colors duration-400 ease-in' /></a>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href='/' class="hover:underline">EduNation</a>. All Rights Reserved.</span>
      
    </footer>
  )
}

export default Footer