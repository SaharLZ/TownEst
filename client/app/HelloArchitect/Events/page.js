"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import AddEventModal from './AddEventModal'; // Rename the modal to reflect the event
import '../style.css';
import Sidebar from '../component/sidebar';
import '../ManageProjects/Project.css';
const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([]);

  const handleAddEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };
 
  return (
    <div className="profile-container">
      <Sidebar/>

      <main className="main-content">
        <header className="header">
          <h2>Events</h2>
          <img width="25" height="25" src="https://img.icons8.com/ios-filled/50/logout-rounded.png" alt="logout-rounded"/>
        </header>
        
        <button 
          className="add-project-button" 
          onClick={() => setIsModalOpen(true)}
        >
          Add Event
        </button>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={index}>
                  <td>{event.eventName}</td>
                  <td>{event.startTime}</td>
                  <td>{event.endTime}</td>
                  <td>{event.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AddEventModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={handleAddEvent} 
        />
      </main>
    </div>
  );
};

export default Page;
