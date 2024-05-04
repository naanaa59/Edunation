import React from 'react'
import hero from '../images/hero.png'

const HeroSection = () => {
  return (
    <div className='hero-bg h-screen flex items-center justify-center '>
        <div className='mx-auto flex flex-col justify-center lg:flex-row'>
            <div className='lg:w-1/2 lg:ml-6 flex flex-col justify-center'>
                <p className='gothic text-3xl mb-6'>Join EduNation's immersive learning platform 
                    and become the hero of your educational journey.
                </p>
                <p className=' text-gray-700 mb-6'>
                We’re a nonprofit with the mission to provide a free, 
                world-class <br /> education for anyone, anywhere.
                </p>
                
                <div className='flex gap-6'>
                <div className='lg:max-w'>
                    <a href="/about" class="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-indigo-600 text-indigo-600 ">
                    <span className="absolute inset-0 bg-indigo-600 transition-all duration-500 ease-in-out transform origin-left scale-x-0 group-hover:scale-x-100"></span>
                        <span class="relative text-indigo-600 transition duration-300 group-hover:text-white ease tracking-wider">About Us</span>
                        
                    </a>
                </div>
                <div className='lg:max-w'>
                    <a href="/login" class="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-indigo-600 text-indigo-600 ">
                    <span className="absolute inset-0 bg-indigo-600 transition-all duration-500 ease-in-out transform origin-left scale-x-0 group-hover:scale-x-100"></span>
                        <span class="relative text-indigo-600 transition duration-300  group-hover:text-white ease tracking-wider "> Learner</span>
                        
                    </a>
                </div>
                <div className='lg:max-w'>
                    <a href="/login" class="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-indigo-600 text-indigo-600 ">
                    <span className="absolute inset-0 bg-indigo-600 transition-all duration-500 ease-in-out transform origin-left scale-x-0 group-hover:scale-x-100"></span>
                        <span class="relative text-indigo-600 transition duration-300 group-hover:text-white ease tracking-wider">Instructor</span>
                        
                    </a>
                </div>
                </div>
                
                
            </div>
            <div className='lg:w-[50%] flex items-center'>
                <img src={hero} alt="HeroImg" className='h-auto w-auto max-h-[80vh] lg:max-h-full' />
            </div>
        </div>
    </div>
  )
}

export default HeroSection