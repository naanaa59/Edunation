import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './scenes/HomePage';
import AboutPage from './scenes/AboutPage';
import LoginPage from './scenes/LoginPage';
import CoursesPage from './scenes/CoursesPage';
import NotFoundPage from './scenes/NotFoundPage';
import StudentPage from './scenes/StudentPage';
import InstructorPage from './scenes/InstructorPage';
import RegisterPage from './scenes/RegisterPage';
import InstructorRegisterPage from './scenes/InstructorRegisterPage';

createRoot(document.getElementById('root')).render(
    <Router>
      <Routes>
        <Route exact path='register' element={<RegisterPage />} />
        <Route exact path='InstructorRegister' element={<InstructorRegisterPage />} />
        <Route exact path='login' element={<LoginPage />} />
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/about" element={<AboutPage/>}/>
        <Route path="/subjects/:subjectId/courses/:courseId" element={<CoursesPage />} />
        <Route exact path="/courses/:courseId" element={<CoursesPage/>}/>
        <Route exact path="/student/me" element={<StudentPage />} />
        <Route exact path='/instructor/me' element={<InstructorPage />} />
        <Route exact path="/404" element={<NotFoundPage/>}/>
      </Routes>
    </Router>
);
