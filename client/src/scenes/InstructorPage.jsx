import React, { useState, useEffect, useCallback } from 'react';
import NavInst from '../components/NavInst';
import { useNavigate } from 'react-router-dom';

const InstructorPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [userCourses, setUserCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [img, setImg] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchCourses = useCallback(async () => {
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
        const userData = await result.json();
        const user = userData.user;
        setUserInfo(user);
        console.log("user infos: ", user);
      } else {
        navigate("/login");
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = await fetch('http://0.0.0.0:5003/instructor/courses/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUserCourses(data.courses);  // Adjust according to your API response
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      navigate('/404');
    }
  }, [navigate]);

  const fetchSubjects = useCallback(async () => {
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
  }, [navigate]);

  const createCourse = async (courseData, subject_id, userId, img) => {
    const form = new FormData();
    form.append("title", courseData.title);
    form.append("description", courseData.description);
    form.append("subject_id", subject_id);
    form.append("instructor_id", userId);

    if (img) {
        form.append("link_photo", img);
    }

    try {
        const response = await fetch(`http://localhost:5003/courses/${subject_id}/${userId}`, {
            method: 'POST',
            body: form,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        await response.json();
        fetchCourses();
    } catch (error) {
        console.error(error);
        navigate('/404');
    }
};

const oneCall = (callback) => {
  let called = false;

  return (...args) => {
    if (!called) {
      called = true;
      return callback(...args);
    }
  };
}
const createCourseAdv = oneCall(createCourse);

const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const courseData = {
        title: formData.get('title'),
        description: formData.get('description')
    };
    const subject_id = formData.get('subject_id');
    const userId = userInfo.id;

    await createCourseAdv(courseData, subject_id, userId, img);
};

  const deleteCourse = async (courseId) => {
    try {
      const response = await fetch(`http://localhost:5003/courses/${courseId}`, {
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
      const response = await fetch('http://localhost:5003/subjects', {
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
  }, [fetchCourses, fetchSubjects]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
// eslint-disable-next-line
  const uploadPictureOnce = oneCall();

  const inputFile = (e) => {
    setImg(e.target.files[0]);
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavInst />
      <div className="container mx-auto px-4 pt-20">
        {userInfo ? (
          <div>
            <h2 className='text-2xl font-semibold text-gray-800'>Welcome, {userInfo.first_name} {userInfo.last_name}!</h2>
          </div>
        ) : (
          <div>No user data</div>
        )}

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">Courses</h2>
        {userCourses.length === 0 ? (
          <p className="text-lg text-gray-600">Unfortunately, you don't have courses yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userCourses.map((course) => (
              <div key={course.id} className="bg-white shadow-md rounded-lg p-4">
                <img src={course.link_photo} alt={course.title} className="mt-2 w-full h-48 object-cover rounded-md transition-transform duration-200 hover:scale-105" />
                <h3 className="text-xl font-semibold mt-4">{course.title}</h3>
                <p className="text-gray-600 mt-2">{course.description}</p>
                <button onClick={() => deleteCourse(course.id)} className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
              </div>
            ))}
          </div>
        )}

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">Subjects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((subject) => (
            <div key={subject.id} className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-xl font-semibold">{subject.name}</h3>
              <p className="text-gray-600 mt-2">{subject.description}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">Create Course</h2>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
          <input type="text" name="title" placeholder="Course Title" required className="w-full px-3 py-2 border rounded focus:border-blue-500 focus:outline-none" />
          <input type="text" name="description" placeholder="Course Description" required className="w-full px-3 py-2 border rounded focus:border-blue-500 focus:outline-none" />
          <select name="subject_id" className="w-full px-3 py-2 border rounded focus:border-blue-500 focus:outline-none">
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>{subject.name}</option>
            ))}
          </select>
          <div className="imageCon w-[300px] mt-4">
            {selectedImage && <img src={selectedImage} alt="SelectedImage" className="w-full h-48 object-cover rounded-md" />}
          </div>
          <label htmlFor="imageHandler" className='mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 cursor-pointer inline-block'>Upload Course Image</label>
          <input onChange={inputFile} id="imageHandler" type="file" name="link_photo" accept="image/jpeg" className="hidden" />
          <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Create Course</button>
        </form>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">Create Subject</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const subjectData = Object.fromEntries(formData.entries());
          createSubject(subjectData);
        }} className="bg-white shadow-md rounded-lg p-6 space-y-4">
          <input type="text" name="name" placeholder="Subject Name" required className="w-full px-3 py-2 border rounded focus:border-blue-500 focus:outline-none" />
          <textarea name="description" placeholder="Description" className="w-full px-3 py-2 border rounded focus:border-blue-500 focus:outline-none mt-2"></textarea>
          <button type="submit" className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">Create Subject</button>
        </form>
      </div>
    </div>
  );
};

export default InstructorPage;
