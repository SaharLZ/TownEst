"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';



export default function Login() {
  const mode = localStorage.getItem('authMode');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(mode === 'signup');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsSignUp(mode === 'signup');
    localStorage.removeItem('authMode');
  }, [mode]);

  useEffect(() => {
    setError(null);
  }, [isSignUp]);

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) return "Password must be at least 8 characters long.";
    if (!hasUpperCase) return "Password must contain at least one uppercase letter.";
    if (!hasLowerCase) return "Password must contain at least one lowercase letter.";
    if (!hasNumber) return "Password must contain at least one number.";
    if (!hasSpecialChar) return "Password must contain at least one special character.";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.removeItem('usermail');
    localStorage.removeItem('token');
    if (isSignUp) {
      const passwordError = validatePassword(password);
      if (passwordError) {
        setError(passwordError);
        return;
      }
    }

    try {
      const endpoint = isSignUp
        ? 'http://localhost:5000/api/register'
        : 'http://localhost:5000/api/login';

      const response = await axios.post(endpoint, { email, password });
      const data = response.data;

      if (response.status === 200) {
        setError(null);
        localStorage.setItem('token', data.token);
        localStorage.setItem('usermail', email);  
        console.log('Logged in user: ' + email);

        setTimeout(() => {
          window.location.href = isSignUp ? '/SignUp' : '/HelloArchitect';
        }, 2000);
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
        (isSignUp ? 'Error during registration. Please try again.' : 'Error during login. Please try again.')
      );
    }
  };

  return (
    <div className="cover">
      <div className="shape shape-1"></div>
      <div className="shape shape-2"></div>
      <div className="shape shape-3"></div>
      <div className="shape shape-4"></div>

      <div className={`containerlogin ${isSignUp ? 'sign-up-mode' : ''}`}>
        <div className="lolou">
          <img src="/images/ar.jpg" alt="" />
        </div>

        <div className='login'>
          <h1>{isSignUp ? "Create an account" : "Hi there!"}</h1>

          <button className="google-login">
            {isSignUp ? "Sign up with Google" : "Log in with Google"}
            <img src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo" />
          </button>

          <div className="or">or</div>

          <form onSubmit={handleSubmit}>
          {
              !isSignUp ? (
                 <>
                     <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type={passwordVisible  ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <img
              src={passwordVisible ? "https://img.icons8.com/ios-glyphs/30/visible--v1.png" : "https://img.icons8.com/ios-glyphs/30/hide.png"}
              alt={passwordVisible ? "Hide password" : "Show password"}
              className='toggle-password'
              onClick={() => setPasswordVisible(!passwordVisible)}
            />
                 </>
              ) : (
                <>
               <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          
                </>
              )
            }

            <button type='submit'>{isSignUp ? "Sign up" : "Log in"}</button>
          </form>

          {error && <div className="error">{error}</div>}

          <div className="forgot">
            <a href="#" className='forg'>Forgot password?</a>

            <p className="sign">
              {isSignUp ? "Already have an account?" : "Don’t have an account?"}
              <a className="signUp" onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp ? "Log in" : "Sign up"}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
