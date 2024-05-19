import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Fade } from 'react-reveal'
import Typical from 'react-typical'
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import aboutus from '../images/about.png'
import badr from '../images/Badr.jpeg'
import oumaima from '../images/oumaima.png'

const AboutPage = () => {
  return (
    <div>
      <Navbar />
      <div className='h-screen'>
        <div className='bg-[#ffe1e5]  h-screen flex items-center justify-center '>
          <div className='mx-auto flex flex-col justify-center lg:flex-row'>
              <div className='lg:w-1/2 lg:ml-6 flex flex-col justify-center'>
                  
                    <p className='text-6xl mb-6'>
                    Welcome to where
                    possibilities 
                      <Typical
                        steps={[' begin.',' start.',' initiate.','', 2000]}
                        loop={Infinity}
                        wrapper='span'
                      />
                    </p>
                  
                  
                  
              </div>
              <div className='lg:w-[50%] flex items-center'>
                  <img src={aboutus} alt="HeroImg" className='h-auto w-auto max-h-[80vh] lg:max-h-full' />
              </div>
          </div>
        </div>
      </div>
      
      <div className='bg-white h-screen '>
                  <p className='flex flex-col lg:flex-row justify-center text-3xl py-6'>Our Mission</p>
                  <div className='mx-auto flex flex-col justify-center lg:flex-row'>
             
                    <div className='lg:w-[50%] flex items-center'>
                      <img src={aboutus} alt="HeroImg" className='h-auto w-auto max-h-[80vh] lg:max-h-full' />
                    </div>
                    <div className='lg:w-1/2 lg:ml-6 flex flex-col justify-center'>
                      <Fade>
                        <p className='text-2xl mt-8'>
                          Our mission at <span>EduNation</span> is to revolutionize learning by providing accessible, flexible, and diverse educational opportunities to learners worldwide. By addressing the following key challenges, we aim to empower individuals to unlock their full potential and achieve their learning goals
                        </p>
                      </Fade>  
              </div>
          </div>
        </div>
        <div className='h-auto '>
            <p className='flex flex-col lg:flex-row justify-center text-3xl py-6'>Meet Our Team</p>
            {/* { CARDS } */}
            <div className='flex flex-col lg:flex-row justify-center'>
              <div className=' p-6'>
                <div className='bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105'>
                  <img
                    src={badr}
                    alt='Team Member 1'
                    className='w-[240px]'
                  />
                  <div className='p-4'>
                    <h2 className='text-xl font-semibold mb-2'>Badr Annabi</h2>
                  <p className='text-gray-700'>Desciption: Sofware Engineer</p>
                    <p className='text-gray-700'>Role: Frontend Developer</p>
                    <div className='flex justify-center mt-4'>
                      <a href='https://twitter.com/annabi_badr' className='mr-4  text-blue-500 hover:text-indigo-600 transition-colors duration-400 ease-in'>
                        <FaTwitter className='w-6 h-6' />
                      </a>
                      <a href='https://www.linkedin.com/in/badr-annabi-a316a3192/' className='mr-4  text-blue-500 hover:text-indigo-600 transition-colors duration-400 ease-in'>
                        <FaLinkedin className='w-6 h-6' />
                      </a>
                      <a href='https://github.com/Badr-Annabi' className=' text-blue-500 hover:text-indigo-600 transition-colors duration-400 ease-in'>
                        <FaGithub className='w-6 h-6' />
                      </a>
                    </div>
                  </div>
              </div>
            </div>
            <div className='p-6'>
              <div className='bg-gray-100 rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105'>
                <img
                  src={oumaima}
                  alt='Team Member 2'
                  className='w-full'
                />
                <div className='p-4'>
                  <h2 className='text-xl font-semibold mb-2'>Oumaima Naanaa</h2>
                  <p className='text-gray-700'>Desciption: Sofware Engineer</p>
                  <p className='text-gray-700'>Role: Backend Developer</p>
                  <div className='flex justify-center mt-4'>
                    <a href='https://twitter.com/naanaa_oumaima' className='mr-4  text-blue-500 hover:text-indigo-600 transition-colors duration-400 ease-in'>
                      <FaTwitter className='w-6 h-6' />
                    </a>
                    <a href='https://www.linkedin.com/in/oumaima-naanaa/' className='mr-4  text-blue-500 hover:text-indigo-600 transition-colors duration-400 ease-in'>
                      <FaLinkedin className='w-6 h-6'/>
                    </a>
                    <a href='https://github.com/naanaa59' className=' text-blue-500 hover:text-indigo-600 transition-colors duration-400 ease-in'>
                      <FaGithub className='w-6 h-6' />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>  
      <Footer />
    </div>
    
  )
}

export default AboutPage