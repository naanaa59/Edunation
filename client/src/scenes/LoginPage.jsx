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
    <div className='flex'>
      <div className='hero-bg w-1/2 flex justify-center items-center'>
        <p className='gothic text-4xl text-center text-black'>Welcome back again</p>
      </div>
      <div className='w-1/2 flex flex-col items-center justify-center h-screen'>
        <div className='bg-red-300 '>
          <div className='gothic text-2xl'>Login</div>
        </div>
        <br />
        <div className='flex flex-col mb-8'>
          <input 
            value={email}
            placeholder='Enter your email'
            onChange={(e) => setEmail(e.target.value)}
            className='inputBox'
          />
          <label className='errorLabel'>{emailError}</label>
        </div>
        <br />
        <div className='flex flex-col relative mb-8'>
          <input 
            type={showPassword ? 'text' : 'password'}
            value={password}
            placeholder='Enter your password'
            onChange={(e) => setPassword(e.target.value)}
            className='inputBox'
          />
          <span
            className='absolute right-2 top-2 cursor-pointer'
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          <label className='errorLabel'>{passwordError}</label>
        </div>
        <div className='w-full flex justify-center'>
          <input className="bg-indigo-600 w-1/2" type="button" onClick={onButtonClick} value={'Log in'} />
        </div>
        <div className='flex gap-2 text-sm'>
          <p className='text-gray-400'>Don't have an account?</p>
          <Link to="/register">
            <span className='text-indigo-600 hover:underline cursor-pointer'>
              Sign up
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
