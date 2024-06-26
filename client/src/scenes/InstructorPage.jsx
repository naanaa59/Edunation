import React, { useState, useEffect } from 'react';
import NavInst from '../components/NavInst';
import { useNavigate } from 'react-router-dom';

const InstructorPage = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [userCourses, setUserCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const token = localStorage.getItem("access_token");
      if (token) {
        const result = await fetch('http://0.0.0.0:5003/token_check/',
          {
            method: 'GET',
              headers: {
                  'Authorization': `Bearer ${token}`,
              }
          }
        )
        const userData = await result.json();
        const user = userData.user
        setUserInfo(user);
        console.log("user infos: ", user)
      }
      else {
        navigate("/login");
      }
      
      const response = await fetch('http://0.0.0.0:5003/instructor/courses/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log("response: ", response);
      const data = await response.json();
      console.log("data:", data)
      
      // setUserCourses(courses);
      setIsLoading(false);
    
    } catch (error) {
      console.error(error);
      // navigate('/404');
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await fetch('http://0.0.0.0:5003/subjects');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSubjects(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      navigate('/404');
    }
  };

  const createCourse = async (courseData, subject_id, userId) => {
    try {

      const response = await fetch(`http://localhost:5003/courses/${subject_id}/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = response.json();
      fetchCourses();
    } catch (error) {
      console.error(error);
      navigate('/404');
    }
  };


  const deleteCourse = async (courseId) => {
    try {
      const response = await fetch(`http://localhost:5003/api/courses/${courseId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchCourses();
    } catch (error) {
      console.error(error);
      navigate('/404');
    }
  };
  const createSubject = async (subjectData) => {
    try {
      const response = await fetch('http://localhost:5003/api/subjects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subjectData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchSubjects();
    } catch (error) {
      console.error(error);
      navigate('/404');
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchSubjects();
  }, []);


  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavInst />
      <div className="bg-gray-100 px-4 pt-20">
      <div className="bg-gray-100 px-4 pt-20">
      {isLoading? (
        <div>Loading...</div>
      ) :!userInfo? (
        <div>No user Data</div> // Or any other message you'd like to display
      ) : (
        <>
          <div>
            <h2>Welcome, {userInfo.first_name} {userInfo.last_name}!</h2>
          </div>
        </>
      )}
    </div>


        <h2 className="text-xl font-bold mb-4">Courses</h2>
        {userCourses.length === 0? (
          <p className='text-xl text-black'>Unfortunately, you don't have courses yet</p>
        ) : (
          userCourses.map((course) => (
            <div key={course.id} className="mb-4 bg-white shadow-md rounded p-4">
              <h3 className="font-semibold">{course.title}</h3>
              <h3 className="font-semibold">{course.description}</h3>
              <img src={course.link_photo} alt={course.title} className="mt-2 w-full h-auto object-cover transition-transform duration-200 hover:scale-105" />
              <button onClick={() => deleteCourse(course.id)} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Delete</button>
            </div>
          ))
        )}

        <h2 className="text-xl font-bold mt-8">Subjects</h2>
        {subjects.map((subject) => (
          <div key={subject.id} className="mb-4 bg-white shadow-md rounded p-4">
            <h3 className="font-semibold">{subject.name}</h3>
          </div>
        ))}

<h2 className="text-xl font-bold mt-8">Create Course</h2>
<form onSubmit={(e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const courseData = Object.fromEntries(formData.entries());
  const subject_id = formData.get('subject_id');
  const userId = userInfo.user.id; // Correctly accessing userId from userInfo

  const fullCourseData = {...courseData, subject_id, userId};
  createCourse(fullCourseData);
}} className="mt-8 space-y-4">
  <input type="text" name="title" placeholder="Course Title" required className="w-full px-3 py-2 border rounded focus:border-blue-500 focus:outline-none" />
  <input type="text" name="description" placeholder="Course Description" required className="w-full px-3 py-2 border rounded focus:border-blue-500 focus:outline-none" />
  <select name="subject_id" className="w-full px-3 py-2 border rounded focus:border-blue-500 focus:outline-none">
    {subjects.map((subject) => (
      <option key={subject.id} value={subject.id}>{subject.name}</option>
    ))}
  </select>
  <input type="file" name="link_photo" accept="image/*" className="w-full px-3 py-2 border rounded focus:border-blue-500 focus:outline-none" />
  <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Create Course</button>
</form>


        <h2 className="text-xl font-bold mt-8">Create Subject</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const subjectData = Object.fromEntries(formData.entries());
          createSubject(subjectData);
        }} className="mt-8 space-y-4">
          <input type="text" name="name" placeholder="Subject Name" required className="w-full px-3 py-2 border rounded focus:border-blue-500 focus:outline-none" />
          <textarea name="description" placeholder="Description" className="w-full px-3 py-2 border rounded focus:border-blue-500 focus:outline-none mt-2"></textarea>
          <button type="submit" className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">Create Subject</button>
        </form>
      </div>
    </div>
  );
};

export default InstructorPage;
