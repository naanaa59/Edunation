import React, { useState, useEffect } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom';

const TABLE_HEAD = ["Course", "Unenroll"];

const StudentPage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState();
  const [userCourses, setUserCourses] = useState([]);
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const check_token = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const token = localStorage.getItem("access_token");
      if (token) {
        const result = await fetch('http://0.0.0.0:5003/token_check/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        const courseResponse = await fetch('http://0.0.0.0:5003/student/courses/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (result.ok && courseResponse.ok) {
          const userInfo = await result.json();
          setUserInfo(userInfo.user);
          const courses = await courseResponse.json();
          setUserCourses(courses.courses);
          setIsLoading(false);
        } else {
          navigate('/login');
        }
      }
    };

    check_token();
  }, [navigate]);

  const unenrollStudent = async (courseId, studentId) => {
    try {
      const response = await fetch(`http://0.0.0.0:5003/courses/${courseId}/unenroll/${studentId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      if (response.ok) {
        setUserCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
      } else {
        console.error('Failed to unenroll from the course');
      }
    } catch (error) {
      console.error(error);
      navigate('/404');
    }
  };

  return (
    <div>
      <Navbar />
      <Card className="pt-20 h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                {userInfo ? `Welcome back ${userInfo.first_name} ${userInfo.last_name}` : 'Loading...'}
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Here, you can see all your courses 
              </Typography>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {userCourses && userCourses.length ? userCourses.map((course, index) => (
                <tr key={index}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {course.title}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {course.description}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td>
                    <Tooltip content="Unenroll">
                      <IconButton
                        variant="text"
                        onClick={() => unenrollStudent(course.id, userInfo.id)}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={2}>You still haven't enrolled in a course...</td>
                </tr>
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <Footer />
    </div>
  );
};

export default StudentPage;
