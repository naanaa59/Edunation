import React from 'react';
import { createRoot } from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './scenes/HomePage';
import AboutPage from './scenes/AboutPage';
import LoginPage from './scenes/LoginPage';
import CoursesPage from './scenes/CoursesPage';
import NotFoundPage from './scenes/NotFoundPage';
import StudentPage from './scenes/StudentPage';

createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route exact path='login' element={<LoginPage />} />
      <Route exact path="/" element={<HomePage />} />
      <Route exact path="/about" element={<AboutPage/>}/>
      <Route exact path="/courses" element={<CoursesPage/>}/>
      <Route exact path="/student" element={<StudentPage />} />
      <Route exact path="/404" element={<NotFoundPage/>}/>
    </Routes>
  </Router>
);
