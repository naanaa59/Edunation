import React from 'react'
import {BsLinkedin} from 'react-icons/bs'
import {FaGithub} from 'react-icons/fa'
import { FaTwitter } from "react-icons/fa";
import logo from '../images/logo.png'

const Footer = () => {
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
              <div className='flex flex-row'>
                <span className="inline-block cursor-pointer hover:underline hover:duration-600">Subject1</span>
                <svg className="h-5 w-5 text-gray-500 group-hover:text-gray-700" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M6 8a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm0 4a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                <ul className="absolute hidden left-20 top-1 bg-white border border-gray-200 py-2 px-4 rounded-md shadow-lg z-10 group-hover:block text-black">
                  <li className=''>Course 1</li>
                  <li>Course 2</li>
                  <li>Course 3</li>
                </ul>
              </div>
            </li>

            {/* { SUBJECT2 } */}
            <li className='relative group'>
              <div className='flex flex-row'>
                <span className="inline-block cursor-pointer hover:underline hover:duration-600">Subject2</span>
                <svg className="h-5 w-5 text-gray-500 group-hover:text-gray-700" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M6 8a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm0 4a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                <ul className="absolute hidden left-20 top-1 bg-white border border-gray-200 py-2 px-4 rounded-md shadow-lg z-10 group-hover:block text-black">
                  <li className=''>Course 1</li>
                  <li>Course 2</li>
                  <li>Course 3</li>
                </ul>
              </div>
            </li>

            {/* { SUBJECT3 } */}
            <li className='relative group'>
              <div className='flex flex-row'>
                <span className="inline-block cursor-pointer hover:underline hover:duration-600">Subject3</span>
                <svg className="h-5 w-5 text-gray-500 group-hover:text-gray-700" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M6 8a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm0 4a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                <ul className="absolute hidden left-20 top-1 bg-white border border-gray-200 py-2 px-4 rounded-md shadow-lg z-10 group-hover:block text-black">
                  <li className=''>Course 1</li>
                  <li>Course 2</li>
                  <li>Course 3</li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className='text-white gothic flex flex-col  lg:w-3/12'>
          <div className='lg:text-3xl'>About</div>
          <ul className='mt-6'>
            <li>About Us</li>
            <li>Contact Us:</li>
            <li>
              <div className='flex flex-row gap-4 my-4'>
                <a href='https://www.linkedin.com/in/badr-annabi-a316a3192/' rel="noreferrer" target='_blank'><BsLinkedin className='w-8 h-8 hover:text-indigo-600 transition-colors duration-400 ease-in'/></a>
                <a href='https://github.com/Badr-Annabi' rel="noreferrer" target='_blank'><FaGithub className='w-8 h-8 hover:text-indigo-600 transition-colors duration-400 ease-in' /></a>
                <a href='https://www.instagram.com/badr_annabi/' rel="noreferrer" target='_blank'> <FaTwitter className='w-8 h-8 hover:text-indigo-600 transition-colors duration-400 ease-in'/></a>
              </div>
              <div className='flex flex-row gap-4 my-4'>
                <a href='https://www.linkedin.com/in/badr-annabi-a316a3192/' rel="noreferrer" target='_blank'><BsLinkedin className='w-8 h-8 hover:text-indigo-600 transition-colors duration-400 ease-in' /></a>
                <a href='https://github.com/Badr-Annabi' rel="noreferrer" target='_blank'><FaGithub className='w-8 h-8 hover:text-indigo-600 transition-colors duration-400 ease-in' /></a>
                <a href='https://www.instagram.com/badr_annabi/' rel="noreferrer" target='_blank'> <FaTwitter className='w-8 h-8 hover:text-indigo-600 transition-colors duration-400 ease-in' /></a>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="#" class="hover:underline">EduNation</a>. All Rights Reserved.</span>
      
    </footer>
  )
}

export default Footer