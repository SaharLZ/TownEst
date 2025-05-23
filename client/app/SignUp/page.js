'use client'


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

import {findUserByEmail,getUserEmail} from '../utils/util'

const Signup = ({ onSignupClick }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    localStorage.removeItem('usermail');
    const email = getUserEmail();
    if (email) {
      findUserByEmail(email).then(user => {
        if (user) setCurrentUser(user);
      });
    }
  }, []);
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      setError('User not authenticated');
      return;
    }

    try {
      const response = await axios.put('http://localhost:5000/api/complete-profile', {
        email: currentUser.email,
        fullName,
        phone,
        country,
        city,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
     
      if (response.status === 200) {
        alert('Profile updated successfully');
        localStorage.setItem('currentUser', JSON.stringify({
          ...currentUser,
          fullName,
          phone,
          country,
          city
        }));
        window.location.href = '/HelloArchitect';
      } else {
        setError(response.data.message || 'Failed to update profile');
      }
    } catch (err) {
      setError('Error updating profile. Please try again later.');
    }
  };

  return (
    <div className="containersign">
      <div className='sign2'>
        <h1>Sign Up</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <img src="https://img.icons8.com/bubbles/50/standing-man.png" alt="standing-man" />
            <input 
              type='text'
              placeholder='Full Name'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required 
            />
          </div>
          <div>
            <img src="https://img.icons8.com/bubbles/50/phone.png" alt="phone" />
            <input 
              type="text" 
              placeholder='Phone Number' 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <img src="https://img.icons8.com/bubbles/50/country.png" alt="country" />
            <input 
              type='text' 
              placeholder='Country'
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          <div>
            <img src="https://img.icons8.com/clouds/50/building.png" alt="building" />
            <input 
              type='text'
              placeholder='City'
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          {error && <div className="error">{error}</div>}

          <button type="submit">Join Us</button>
        </form>
      </div>

      <div className="lolou">
        <img src="/assets/wa3.jpg" alt="" />
      </div>
    </div>
  );
};

const UserSelection = () => {
  const [selectedUserType, setSelectedUserType] = useState(null);

  const handleSelect = (userType) => {
    setSelectedUserType(userType);
  };

  return (
    <div className="user-selection-container">
      <h1>Select Your Role</h1>
      <div className="user-selection">
        <div
          className={`user-card ${selectedUserType === 'architect' ? 'selected' : ''}`}
          onClick={() => handleSelect('architect')}
        >
          <img src="/assets/architectz3ma.png" alt="Architect" />
          <p>Architect</p>
        </div>
        <div
          className={`user-card ${selectedUserType === 'designer' ? 'selected' : ''}`}
          onClick={() => handleSelect('designer')}
        >
          <img src="/assets/designerz3ma.png" alt="Interior Designer" />
          <p>Interior Designer</p>
        </div>
        <div
          className={`user-card ${selectedUserType === 'User' ? 'selected' : ''}`}
          onClick={() => handleSelect('User')}
        >
          <img src="/assets/user.png" alt="User" />
          <p>User</p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          if (selectedUserType) {
            alert(`Welcome ${selectedUserType}`);
            window.location.href = '/Hello'; // Ensure redirection
          } else {
            alert('Please select your user type.');
          }
        }}
      >
        Confirm Selection
      </button>
    </div>
  );
};

export default function Login() {
  const [isSignupCompleted, setIsSignupCompleted] = useState(false);

  const handleSignupClick = () => {
    setIsSignupCompleted(true);
  };

  return (
    <div className="cover">
      <div className="shape shape-1"></div>
      <div className="shape shape-2"></div>
      <div className="shape shape-3"></div>
      <div className="shape shape-4"></div>

      {!isSignupCompleted ? (
        <Signup onSignupClick={handleSignupClick} />
      ) : (
        <UserSelection />
      )}
    </div>
  );
}
