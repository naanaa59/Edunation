import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const loginUser = async (email, password) => {
    try {
      const response = await fetch('http://0.0.0.0:5003/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem('access_token', result.access_token);
        if (result.type === "Student") {
          navigate('/student/me');
        } else if (result.type === "Instructor") {
          navigate('/instructor/me');
        }
      } else {
        const errorData = await response.json();
        if (errorData.message === 'Incorrect password') {
          setPasswordError('Incorrect password. Please try again.');
        } else if (errorData.message === 'User not found') {
          setEmailError('Email not found. Please try again.');
        } else {
          setPasswordError('An error occurred. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setPasswordError('An error occurred. Please try again.');
    }
  };

  const onButtonClick = (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    if (email && password) {
      loginUser(email, password);
    } else {
      if (!email) setEmailError('Email is required');
      if (!password) setPasswordError('Password is required');
    }
  };

  return (
    <div className='flex flex-col md:flex-row h-screen'>
      <div className='bg-indigo-600 md:w-1/2 flex justify-center items-center p-4'>
        <p className='gothic text-2xl md:text-4xl text-center text-white'>Welcome back again</p>
      </div>
      <div className='md:w-1/2 flex flex-col items-center justify-center p-4'>
        <div className='bg-blue-100 p-4 w-full max-w-md border border-gray-300 shadow-xl rounded-lg'>
          <div className='gothic text-2xl text-center mb-4'>Login</div>
          <form className='space-y-4'>
            <div className='flex flex-col'>
              <input 
                value={email}
                placeholder='Enter your email'
                onChange={(e) => setEmail(e.target.value)}
                className='inputBox p-2 border border-gray-300 rounded'
              />
              <label className='errorLabel text-red-600'>{emailError}</label>
            </div>
            <div className='flex flex-col relative'>
              <input 
                type={showPassword ? 'text' : 'password'}
                value={password}
                placeholder='Enter your password'
                onChange={(e) => setPassword(e.target.value)}
                className='inputBox p-2 border border-gray-300 rounded'
              />
              <label className='errorLabel text-red-600'>{passwordError}</label>
              <span
                className='absolute right-[1.4rem] top-[1.6rem] transform -translate-y-1/2 cursor-pointer'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div>
              <button
                className="bg-indigo-600 text-white py-2 px-4 rounded w-full"
                onClick={onButtonClick}
              >
                Log in
              </button>
            </div>
          </form>
          <div className='flex justify-center gap-2 text-sm mt-4'>
            <p className='text-gray-400'>Don't have an account?</p>
            <Link to="/register">
              <span className='text-indigo-600 hover:underline cursor-pointer'>
                Sign up
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
