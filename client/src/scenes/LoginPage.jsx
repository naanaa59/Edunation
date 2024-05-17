import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'




const LoginPage = () => {
  const token = localStorage.getItem('access_token');
  if (token) {
    
  }
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasworError] = useState('');
  const navigate = useNavigate();

  const loginUser = async (email, password) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = await fetch('http://0.0.0.0:5003/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
       if (response.ok) {
          const result = await response.json();
      //   // console.log(result)
          const token = localStorage.setItem('access_token', result.access_token);
          console.log(token)
          if (result.type === "Instructor") {
            navigate('/instructor/me');
          }
          else if (result.type === "Student") {
            navigate('/student/me');
          }

      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const onButtonClick = (e) => {
    e.preventDefault();
    if (email && password) {
      loginUser(email, password);
    } else {
      setEmailError('Email is required')
      setPasworError('Password is required')
    }
  }
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
        <div className='flex flex-col'>
        <input 
            type='password'
            value={password}
            placeholder='Enter your password'
            onChange={(e) => setPassword(e.target.value)}
            className='inputBox'
            />
            <label className='errorLabel'>{passwordError}</label>
        </div>
        <br />
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
    
  )
}

export default LoginPage