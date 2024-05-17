import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const InstructorRegisterPage = () => {
  const [name, setName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (pwd) => {
    const lowerCase = /[a-z]/;
    const upperCase = /[A-Z]/;
    const number = /[0-9]/;
    const symbol = /[!@#$%^&*]/;

    if (pwd.length < 8) {
      return 'Use 8 characters or more for your password';
    } else if (!lowerCase.test(pwd)) {
      return 'Password should at least have one lowercase letter';
    } else if (!upperCase.test(pwd)) {
      return 'Password should at least have one uppercase letter';
    } else if (!number.test(pwd)) {
      return 'Password should at least have one number';
    } else if (!symbol.test(pwd)) {
      return 'Password should at least have one symbol';
    } else {
      return null; // No error
    }
  };

  const RegisterUser = async (name, familyName, email, password) => {
    try {
      const response = await fetch('http://0.0.0.0:5003/instructor/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "first_name": name,
          "last_name": familyName,
          "email": email,
          "password": password
        }),
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        navigate("/login");
      } else {
        console.error('Network error');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onButtonClick = (e) => {
    e.preventDefault();
    const pwdError = validatePassword(password);
    const confirmPwdError = validatePassword(confirmPassword);

    if (!name) {
      setNameError('Full Name is required');
    } else {
      setNameError('');
    }

    if (!email) {
      setEmailError('Email is required');
    } else {
      setEmailError('');
    }

    if (pwdError) {
      setPasswordError(pwdError);
    } else if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }

    if (!pwdError && !confirmPwdError && password === confirmPassword && name && email) {
      RegisterUser(name, familyName, email, password);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPwd = e.target.value;
    setConfirmPassword(confirmPwd);
    const error = validatePassword(confirmPwd);
    if (password !== confirmPwd) {
      setConfirmPasswordError('Passwords do not match');
    } else if (error) {
      setConfirmPasswordError(error);
    } else {
      setConfirmPasswordError('');
    }
  };

  return (
    <div className='flex'>
      <div className='bg-indigo-600 w-1/2 flex justify-center items-center'>
        <p className='gothic text-4xl text-center text-white'>You're one step close to be part of our instructors community</p>
      </div>
      <div className='w-1/2 flex flex-col items-center justify-center h-screen'>
        <div className='bg-red-300 '>
          <div className='gothic text-2xl'>Register Here</div>
        </div>
        <br />
        <div className='flex gap-4 mb-8'>
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
        <div className='flex flex-col relative mb-4'>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            placeholder='Enter your password'
            onChange={(e) => setPassword(e.target.value)}
            className='inputBox'
          />
          <label className='errorLabel'>{passwordError}</label>
          <span
            className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer'
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <div className='flex flex-col relative mb-4'>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            placeholder='Confirm your password'
            onChange={handleConfirmPasswordChange}
            className='inputBox mt-4'
          />
          <label className='errorLabel'>{confirmPasswordError}</label>
          <span
            className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer'
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <br />
        <div>
          <input className="bg-indigo-600" type="button" onClick={onButtonClick} value={'Register'} />
        </div>
        <div className='flex gap-2 text-sm'>
          <p className='text-gray-400'>already had an account?</p>
          <Link to="/login">
            <span className='text-indigo-600 hover:underline cursor-pointer'>
              Login
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default InstructorRegisterPage;
