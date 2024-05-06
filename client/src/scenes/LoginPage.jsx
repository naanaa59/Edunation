import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { useCookies } from 'react-cookie'


const LoginPage = () => {
  const token = localStorage.getItem('access_token');
  if (token) {
    
  }
  const responseMessage = (credentialResponse) => {
    const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
    console.log(credentialResponseDecoded);
  };

  const errorMessage = (error) => {
    console.log(error);
  };
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasworError] = useState('');
  const [cookies, setCookie] = useCookies(['user']);
  const navigate = useNavigate();

  const loginUser = async (email, password) => {
    try {
      const response = await fetch('http://0.0.0.0:5003/students/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result)
        const token = localStorage.setItem('access_token', result.access_token);

      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const onButtonClick = (e) => {
    e.preventDefault();
    if (email && password) {
      loginUser(email, password);
      navigate('/');
    } else {
      setEmailError('Email is required')
      setPasworError('Password is required')
    }
  }
  return (
    <div className='flex'>
      <div className='bg-indigo-600 w-1/2 flex justify-center items-center'>
        <p className='gothic text-4xl text-center text-white'>You're one step close to be part of our community</p>
      </div>
      <div className='w-1/2 flex flex-col items-center justify-center h-screen'>
        <div className='bg-red-300 '>
          <div className='gothic text-2xl'>Login</div>
        </div>
        <br />
        <div className='my-4'>
          <GoogleLogin onSuccess={responseMessage}  onError={errorMessage} />
        </div>
        <div className='flex flex-col'>
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
            value={password}
            placeholder='Enter your password'
            onChange={(e) => setPassword(e.target.value)}
            className='inputBox'
            />
            <label className='errorLabel'>{passwordError}</label>
        </div>
        <br />
        <div>
          <input className="bg-indigo-600" type="button" onClick={onButtonClick} value={'Log in'} />
        </div>
    </div>
    </div>
    
  )
}

export default LoginPage