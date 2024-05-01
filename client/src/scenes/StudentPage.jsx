// import React ,{useEffect, useState} from 'react'
// import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'
// import { Link } from 'react-router-dom'
// import course1 from '../images/infocourse.jpeg'

// const StudentPage = () => {
//     const [subjects, setSubjects] = useState([]);
//     useEffect(() => {
//       fetch('http://0.0.0.0:5003/subjects')
//          .then(response => response.json())
//          .then(async (subjectsData) => {
//            console.log('Fetched subjects:', subjectsData);
     
//            // Fetch courses for each subject
//            const subjectsWithCourses = await Promise.all(subjectsData.map(async (subject) => {
//              const response = await fetch(`http://0.0.0.0:5003/subjects/${subject.id}/courses`);
//              const courses = await response.json();
//              return { ...subject, courses }; // Return a new object with courses added
//            }));
     
//            setSubjects(subjectsWithCourses);
//          })
//          .catch(error => console.error('Error:', error));
//      }, []);
//   return (
    
//     <div>
//         <Navbar />
//         <div className='hero-bg pt-20 flex lg:flex-col py-8'>
//             <p className='gothic text-3xl '>Welcome Back Badr Annabi</p>
//             <div className='flex justify-center'>
//                 <div class="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-indigo-600 text-indigo-600 text-white">
//                     <span className="absolute inset-0 bg-indigo-600 transition-all duration-500 ease-in-out transform origin-left scale-x-0 group-hover:scale-x-100"></span>
//                     <span class="relative text-indigo-600 transition duration-300 group-hover:text-white ease tracking-wider">My Learnings</span>    
//                 </div>      
//             </div>
//             <div className='bg-white border-2 border-black flex'>
//             {subjects.map((subject, index) => (
//             <div key={index}>
//                 <p className='font-semibold mr-4 cursor-pointer hover:underline hover:duration-600'>{subject.name}</p>
//                 <ul className='gap-4  p-6'>
//                   {subject.courses.map((course, courseIndex) => (
//                     <li key={courseIndex} className='pl-2'>
//                         <div className='bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105'>
//                   <img
//                     src={course1}
//                     alt='Team Member 1'
//                   />
//                     <div className='p-4'>
//                       <h2 className='text-xl font-semibold mb-2'>{course.title}</h2>
//                       <p className='text-gray-700'>{course.description}</p>
//                     </div>
//                   </div>
                      
//                     </li>
//                         ))}
//                 </ul>
//             </div>
//             ))} 
//             </div>
//         </div>
//         <Footer />
//     </div>
//   )
// }

// export default StudentPage
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { TrashIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
 
const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Monitored",
    value: "monitored",
  },
  {
    label: "Unmonitored",
    value: "unmonitored",
  },
];
 
const TABLE_HEAD = ["Course", "Subject", "Instructor", "Unenroll"];
 
const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "John Michael",
    email: "john@creative-tim.com",
    job: "Manager",
    org: "Organization",
    online: true,
    date: "23/04/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    name: "Alexa Liras",
    email: "alexa@creative-tim.com",
    job: "Programator",
    org: "Developer",
    online: false,
    date: "23/04/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    name: "Laurent Perrier",
    email: "laurent@creative-tim.com",
    job: "Executive",
    org: "Projects",
    online: false,
    date: "19/09/17",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
    name: "Michael Levi",
    email: "michael@creative-tim.com",
    job: "Programator",
    org: "Developer",
    online: true,
    date: "24/12/08",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
    name: "Richard Gran",
    email: "richard@creative-tim.com",
    job: "Manager",
    org: "Executive",
    online: false,
    date: "04/10/21",
  },
];
 
const StudentPage = () =>  {
  return (
    <div>
    <Navbar />
    <Card className="pt-20 h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Welcome back Badr Annabi
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
            {TABLE_ROWS.map(
              ({ img, name, email, job, org, online, date }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr key={name}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src={img} alt={name} size="sm" />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {name}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {job}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {org}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={"online"}
                        />
                      </div>
                    </td>
                    
                    <td className={classes}>
                      <Tooltip content="unenroll">
                        <IconButton variant="text">
                          <TrashIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              },
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
