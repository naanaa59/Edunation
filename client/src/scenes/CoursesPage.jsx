import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import coursepic from '../images/infocourse.jpeg'
import { useNavigate,  useParams } from 'react-router-dom'



const CousesPage = () => {
  const [courseInfo, setCourseInfo] = useState([]);
  const [enrollmentMessage, setEnrollmentMessage] = useState('');
  const { courseId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const token = localStorage.getItem("access_token");
      if (token) {
        const result = await fetch('http://0.0.0.0:5003/token_check/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        const courseResponse = await fetch(`http://0.0.0.0:5003/courses/${courseId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (result.ok) {
          console.log("ok");
          console.log("result:", result);
          // const userInfo = await result.json();
          // setUserInfo(userInfo.user);
          console.log("CourseResponse:", courseResponse);
          const course = await courseResponse.json();
          console.log("course info: ", course);
          setCourseInfo(course);
        } else {
          navigate('/login');
          console.log("Test");
        }
        console.log(result);
      }
    };
    checkToken();
  }, [navigate, courseId]);


  const enrollStudent = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const token = localStorage.getItem("access_token");
      if (token) {
        const result = await fetch('http://0.0.0.0:5003/token_check/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
      
      const userInfo = await result.json();
      // setUserInfo(userInfo.user);
      const student = userInfo.user;
      const enrollResponse = await fetch(`http://0.0.0.0:5003/courses/${courseId}/enroll/${student.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (enrollResponse.ok) {
        const data = await enrollResponse.json();
        console.log("Enroll data:", data.message);
        setEnrollmentMessage('Enrollment successful!')
      } else if (enrollResponse.status === 400) {
        console.log("You have already enrolled in that course");
        setEnrollmentMessage('You have already enrolled in that course');

      } else {
        console.log(`Failed to enroll student: ${enrollResponse.status}`);
      }
      // if (!enrollResponse.ok) {
      //   throw new Error('Failed to enroll student');
      // }
      // const data = await enrollResponse.json();
      // console.log("enroll data", data.message);
    } 
    } catch (error) {
      console.log(error);
      // navigate('/404'); 
    }
  };

  

  if (!courseInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className='h-screen container'>
        <img src={coursepic} alt="coursepic" className=' pt-20 h-[50%]' />
        <p className='pt-20'>{courseInfo.title}</p>
        <p>{courseInfo.description}</p>
        <div className='lg:max-w flex '>
          <button onClick={() => enrollStudent(1)} className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-indigo-600 text-indigo-600">
            <span className="absolute inset-0 bg-indigo-600 transition-all duration-500 ease-in-out transform origin-left scale-x-0 group-hover:scale-x-100"></span>
            <span className="relative text-indigo-600 transition duration-300 group-hover:text-white ease tracking-wider"> Enroll </span>
          </button>
          
        </div>
        {enrollmentMessage && <p className='mt-2 text-gray-600'>{enrollmentMessage}</p>}
      </div>
      
      <Footer />
    </div>
  )
}

export default CousesPage