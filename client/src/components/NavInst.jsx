import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/styles.css'
import edunation from '../images/edunation.png'
import UserMenu from './UserMenu'

const NavInst = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

useEffect(() => {
  const check_token = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const token =  localStorage.getItem("access_token")
   if (token) {
    setIsLoggedIn(true);
   }
  };
  check_token();
 }, []);


  return (
    <nav className=" bg-white w-full fixed flex flex-row items-center z-10 shadow-2xl">
      <div className="container  flex items-center gap-10">
      <Link to="/" className="w-1/3 lg:w-1/6 my-2">
          <img src={edunation} alt="Edunation" />
        </Link>
        <div className="search">
          <form className="search-form flex items-center">
            <div className="relative">
              {/* Search Input */}
              <input type="search" id="default-search" className="flex-grow pl-8 pr-2 py-2 text-sm text-gray-900  rounded-lg bg-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-800 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder-white" placeholder="Search..." required />
              {/* SVG Icon */}
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="search-logo w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
            </div>
            {/* Submit Button */}
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
          </form>
        </div> 
    </div>
    {/* Checking if the user has been logged or not */}
    <div className='m-auto mr-16 flex '>
    {isLoggedIn ? (
      
      <UserMenu />
      
    ) : (
      <>
        <a href="/login" class="rounded-sm px-2 py-2 m-1 overflow-hidden  cursor-pointer border-2 font-medium border-indigo-600 text-indigo-600 transition-colors duration-300 ease-in-out delay-150 hover:text-white hover:bg-indigo-600 hover:rounded-xl">
          Login
        </a>
        <a href="/register" class="rounded-sm px-2 py-2 m-1 overflow-hidden  cursor-pointer border-2 font-medium border-indigo-600 text-indigo-600 hover:text-white hover:bg-indigo-600 transition duration-300 ease-in-out delay-150 hover:rounded-xl">
          Register                 
        </a>              
      </>
    )}
    </div>
</nav>

  )
}

export default NavInst