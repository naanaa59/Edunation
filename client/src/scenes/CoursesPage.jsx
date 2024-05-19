import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import coursepic from '../images/infocourse.jpeg';
import { useNavigate, useParams } from 'react-router-dom';

const CoursesPage = () => {
  const [courseInfo, setCourseInfo] = useState({});
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
          },
        });
        const courseResponse = await fetch(`http://0.0.0.0:5003/courses/${courseId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (result.ok) {
          console.log("ok");
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
          },
        });
      
        const userInfo = await result.json();
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
          setEnrollmentMessage('Enrollment successful!');
        } else if (enrollResponse.status === 400) {
          console.log("You have already enrolled in that course");
          setEnrollmentMessage('You have already enrolled in that course');
        } else {
          console.log(`Failed to enroll student: ${enrollResponse.status}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!courseInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className='min-h-screen bg-gray-100'>
        <div className='container mx-auto pt-20 px-4'>
          <div className='relative'>
            <img src={courseInfo.link_photo} alt="coursepic" className='w-full h-64 object-cover rounded-lg shadow-lg' />
            <div className='absolute inset-0 bg-black opacity-50 rounded-lg'></div>
            <div className='absolute inset-0 flex items-center justify-center'>
              <h1 className='text-4xl font-bold text-white'>{courseInfo.title}</h1>
            </div>
          </div>
          <div className='mt-8 bg-white shadow-md rounded-lg p-6'>
            <p className='text-lg text-gray-700'>{courseInfo.description}</p>
            <div className='flex justify-center mt-6'>
              <button
                onClick={enrollStudent}
                className="rounded-md px-6 py-3 relative overflow-hidden group cursor-pointer border-2 font-medium border-indigo-600 text-indigo-600"
              >
                <span className="absolute inset-0 bg-indigo-600 transition-transform duration-500 ease-in-out transform scale-x-0 group-hover:scale-x-100"></span>
                <span className="relative text-indigo-600 transition duration-300 group-hover:text-white">Enroll</span>
              </button>
            </div>
            {enrollmentMessage && <p className='mt-4 text-center text-green-600'>{enrollmentMessage}</p>}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CoursesPage;
