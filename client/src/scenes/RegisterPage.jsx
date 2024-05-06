import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { useCookies } from 'react-cookie'


const RegisterPage = () => {
  const responseMessage = (credentialResponse) => {
    const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
    // console.log(credentialResponseDecoded);
  };

  const errorMessage = (error) => {
    console.log(error);
  };
  const [name, setName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasworError] = useState('');
  const [cookies, setCookie] = useCookies(['user']);
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const RegisterUser = async (name, familyName, email, password) => {
    try {
      const response = await fetch('http://0.0.0.0:5003/students/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"first_name": name,
                                "last_name": familyName,
                                "email": email,
                                "password": password
    }),
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result)
      } else {
        // Handle network error
        console.error('Network error');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const onButtonClick = (e) => {
    e.preventDefault();
    if (email && password) {
      RegisterUser(name, familyName, email, password);
    //   setRedirect(true);
        navigate("/login")
    } else {
        setNameError('Full Name is required')
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
          <div className='gothic text-2xl'>Register Here</div>
        </div>
        <br />
        <div className='my-4'>
          <GoogleLogin onSuccess={responseMessage}  onError={errorMessage} />
        </div>
        <br/>
        <div className='flex gap-4'>
            <div className='flex flex-col'>
            <input 
                value={name}
                placeholder='Name'
                onChange={(e) => setName(e.target.value)}
                className='inputBox'
                />
                <label className='errorLabel'>{nameError}</label>
            </div>
            <br />
            <div className='flex flex-col'>
            <input 
                value={familyName}
                placeholder='Family Name'
                onChange={(e) => setFamilyName(e.target.value)}
                className='inputBox'
                />
                <label className='errorLabel'>{nameError}</label>
            </div>
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
          <input className="bg-indigo-600" type="button" onClick={onButtonClick} value={'Register'} />
        </div>
    </div>
    </div>
    
  )
}

export default RegisterPage;