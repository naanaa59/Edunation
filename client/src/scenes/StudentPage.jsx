import React ,{ useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { TrashIcon} from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  CardBody,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom'
 
const TABLE_HEAD = ["Course", "Subject", "Instructor", "Unenroll"];
 
const StudentPage = () =>  {

const navigate = useNavigate();
const [userInfo, setUserInfo] = useState();
const [userCourses, setUserCourses] = useState([]);
const [isLoading, setIsLoading] = useState(true);


useEffect(() => {
    const check_token = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const token =  localStorage.getItem("access_token")
     if (token) {
      const result = await fetch('http://0.0.0.0:5003/token_check/',
        {
          method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
      )
      const courseResponse = await fetch('http://0.0.0.0:5003/student/courses/',
        {
          method: 'GET',
          headers: {
            'Authorization':`Bearer ${token}`,
          
          },
        });
      if (result.ok) {
        console.log("ok")
        console.log("result:", result);
        console.log("CoursesResponse:", courseResponse)
        const userInfo = await result.json();
        setUserInfo(userInfo.user);
        const courses = await courseResponse.json();
        console.log("Student_Courses:",courses)
        setUserCourses(courses.courses);
        
        setIsLoading(false);
        // console.log("User Information:", userInfo.user);
        
      } else {
        navigate('/login')
        console.log("Test")
      }
       console.log(result)
       
    }
      }
check_token();  
}, [navigate]) 

// const [courses, setCourses] = useState([]);
//   useEffect(() => {
//     fetch('http://0.0.0.0:5003/courses')
//        .then(response => response.json())
//        .then(coursesData => {
//          console.log('Fetched Courses:', coursesData);
//          setCourses(coursesData);
//        })
//        .catch(error => console.error('Error:', error));
//    }, []);
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
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          
          <div className="w-full md:w-72">
            <Input
              label="Search.."
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
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
            {userCourses && userCourses.length ? userCourses.map((course, index) =>
              (
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
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {course.subject_id}
                        </Typography>
                        
                      </div>
                    </td>
                    <td>
                      <div className="w-max">
                      <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {course.instructor_id}
                        </Typography>
                      </div>
                    </td>
                    
                    <td>
                      <Tooltip content="unenroll">
                        <IconButton variant="text">
                          <TrashIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4}>You still didn't enroll in a course...</td>
                  </tr>
                )}
          </tbody>
        </table>
      </CardBody>
      {/* <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter> */}
    </Card>
    <Footer />
    </div>
  );
}
export default StudentPage
