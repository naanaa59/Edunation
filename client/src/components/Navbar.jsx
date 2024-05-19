import React, { useEffect, useState } from 'react'
import {
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react"
import { Link } from 'react-router-dom'
import '../styles/styles.css'
import edunation from '../images/edunation.png'
import arrow from '../images/arrow.png'
import UserMenu from './UserMenu'

const Navbar = () => {
  const [subjects, setSubjects] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // eslint-disable-next-line
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

useEffect(() => {
  const check_token = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const token =  localStorage.getItem("access_token")
   if (token) {
    setIsLoggedIn(true);
   }
  };
  check_token();

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

 const searchHandler = async (e) => {
  const searchValue = e.target.value;
  setSearchTerm(searchValue);
  console.log(searchValue);
  if (!searchValue.trim() === '') {
    setIsSearchVisible(false);
    return;
  }
  try {
    const response = await fetch('http://localhost:5003/courses/search/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "title": searchValue }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    // Handle the search result (e.g., update the state to display search results)
    console.log("searchResult:", data);
    setSearchResults(data);
    setIsSearchVisible(true) // Replace with your logic to display search results
  } catch (error) {
    console.error(error);
    setIsSearchVisible(false);
    // Handle the error (e.g., show an error message to the user)
  }
 };


  return (
    <nav className=" bg-white w-full fixed flex flex-row items-center z-10 shadow-2xl">
      <div className="container  flex items-center gap-10">
        {/* <img src={logo} alt="EduNation" className="w-14 h-14" /> */}
        <Link to="/" className="w-1/3 lg:w-1/6 my-2">
          <img src={edunation} alt="Edunation" />
        </Link>
        
          <Popover>
          <PopoverHandler>
          <div
              className=' relative group text-lg text-black font-semibold mr-4 cursor-pointer'>
                <p>Courses</p>
                <img 
                  src={arrow} 
                  alt="Courses"
                  className='w-3 h-3 absolute top-[0.55rem] left-[4.5rem] group-hover:rotate-90 duration-500'
                  viewBox="0 0 20 20" />
            </div>
          </PopoverHandler>
          <PopoverContent className='mt-2 z-10 grid grid-cols-3 gap-4'>
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
          </PopoverContent>
        </Popover>
        
        
        <div className="search hidden  lg:block">
          <form className="search-form flex items-center ">
            <div className="relative">
              {/* Search Input */}
              <input
                type="search"
                id="default-search"
                onChange={searchHandler}
                className="flex-grow pl-8 pr-2 py-2 text-sm text-gray-900 rounded-lg bg-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-800 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder-white"
                placeholder="Search..."
                required
              />
              {searchResults.length > 0 && (
                <div className='absolute backdrop-blur-xl bg-gray rounded-lg shadow-xl w-full py-4 mt-[0.36rem] border border-gray-300'>
                  <ul className='container' id='searchContainer'>
                    {searchResults.map((result, index) => (
                      <li key={index}>
                        <Link to={`/courses/${result.id}`}>
                          {result.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {/* SVG Icon */}
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="search-logo w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
            </div>
            {/* Submit Button */}
            <button type="submit"  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
          </form>
        </div> 
    </div>
    {/* Checking if the user has been logged or not */}
    <div className='m-auto mr-16 flex '>
    {isLoggedIn ? (
      
      <UserMenu />
      
    ) : (
      <>            
      </>
    )}
    </div>
</nav>

  )
}

export default Navbar