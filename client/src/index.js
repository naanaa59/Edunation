import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './scenes/HomePage';
import AboutPage from './scenes/AboutPage';
import LoginPage from './scenes/LoginPage';
import CoursesPage from './scenes/CoursesPage';
import NotFoundPage from './scenes/NotFoundPage';
import StudentPage from './scenes/StudentPage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import RegisterPage from './scenes/RegisterPage';

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='445798157623-f2cl4ha3cqdi44i9jl6nuaul219o4ttj.apps.googleusercontent.com' >
  <Router>
    <Routes>
    <Route exact path='register' element={<RegisterPage />} />
      <Route exact path='login' element={<LoginPage />} />
      <Route exact path="/" element={<HomePage />} />
      <Route exact path="/about" element={<AboutPage/>}/>
      <Route exact path="/courses" element={<CoursesPage/>}/>
      <Route exact path="/student/me" element={<StudentPage />} />
      <Route exact path="/404" element={<NotFoundPage/>}/>
    </Routes>
  </Router>
  </GoogleOAuthProvider>
);
