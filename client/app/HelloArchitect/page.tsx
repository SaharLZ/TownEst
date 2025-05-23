'use client';

import React, { useEffect, useState } from 'react';
import './style.css';
import Link from 'next/link';
import Sidebar from './component/sidebar';
import {findUserByEmail,getUserEmail} from '../utils/util'

interface User {
  fullName: string;
  phone: string;
  country: string;
  city: string;
  email: string;
  dateOfRegistration : Date
  
}

const UserProfile = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    
    const email = getUserEmail();
    if (email) {
      findUserByEmail(email).then(user => {
        if (user) setCurrentUser(user);

      });
    }
  }, []);

  return (
    <div className="profile-container">
      <Sidebar/>

      <main className="main-content">
        <header className="header">
          <h2>Dashboard</h2>
          <img width="25" height="25" src="https://img.icons8.com/ios-filled/50/logout-rounded.png" alt="logout-rounded"/>
        </header>

        <section className="info">
          <div className="user-details">
            <img
              src="/assets/hbeba.jpg"
              alt="User"
              className="profile-pic"
            />
            <div className="udetails">
              <h3>{currentUser?.fullName || 'User Name'}</h3>
              <p>
  <span>Date of registration:</span>
  {currentUser?.dateOfRegistration
    ? new Date(currentUser.dateOfRegistration).toLocaleDateString()
    : 'Unknown'}
</p>
              <p><span>Country, city:</span> {currentUser?.country || 'Unknown'}, {currentUser?.city || 'Unknown'}</p>
              <p><span>Email:</span> {currentUser?.email || 'Unknown'}</p>
              <p><span>Phone:</span> {currentUser?.phone || 'Unknown'}</p>

              <div className="social-links">
               <div>
                <a href="#"><img src="https://img.icons8.com/fluency/48/linkedin.png" alt="linkedin"/></a>
                <a href="#"><img src="https://img.icons8.com/color/48/whatsapp--v1.png" alt="whatsapp--v1"/></a>
                <a href="#"><img src="https://img.icons8.com/fluency/48/telegram-app.png" alt="telegram-app"/></a>
                <a href="#"><img src="https://img.icons8.com/fluency/48/facebook-new.png" alt="facebook-new"/></a>
                <a href="#"><img src="https://img.icons8.com/fluency/48/instagram-new.png" alt="instagram-new"/></a>
                </div>
              </div>

            </div>

          </div>

          <div className="details">
            <div className="tsetfo">
              <div className="card-info">
                <h3>Projects in progress</h3>
                <p>4</p>   
              </div>
              <div className="card-info">
                <h3>Projects Completed</h3>
                <p>25</p>   
              </div>
            </div>
            <div className="tsetfo">
              <div className="card-info">
                <h3>Projects on site</h3>
                <p>5</p>   
              </div>
              <div className="card-info">
                <h3>Events coming</h3>
                <p>2</p>   
              </div>
            </div>
          </div>
        </section>

        <section className="limiti">
          <section className="project">
            <div className="course-list">
              <h2>Latest Projects</h2>
              <div className="course-item">
                <p>House </p>
                <p>Larache, chaaban</p>
                <span className="status complete">Completed</span>
              </div>
              <div className="course-item">
                <p>Appartement</p>
                <p>Tangier, Ahlan </p>
                <span className="status in-progress">Started: 13.06.2023</span>
              </div>
            </div>
          </section>
          <section className="project">
            <div className="course-list">
              <h2>ُEvents Coming</h2>
              <div className="course-item">
                <p>House </p>
                <span className="status in-progress">Started: 13.06.2023</span>
              </div>
              <div className="course-item">
                <p>Appartement</p>
                <span className="status in-progress">Started: 13.06.2023</span>
              </div>
            </div>
          </section>
        </section>

      </main>
    </div>
  );
};

export default UserProfile;
