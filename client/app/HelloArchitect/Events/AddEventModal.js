import React, { useState } from 'react';
import '../ManageProjects/modal.css';

const AddEventModal = ({ isOpen, onClose, onSubmit }) => {
  const [eventName, setEventName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = () => {
    const newEvent = {
      eventName,
      startTime,
      endTime,
      location
    };
    onSubmit(newEvent);
    onClose();
    // Reset fields
    setEventName('');
    setStartTime('');
    setEndTime('');
    setLocation('');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Event</h2>
        <div className="modal-column">
         
          <input 
            type="text" 
            value={eventName} 
            onChange={(e) => setEventName(e.target.value)} 
            placeholder="Enter event name" 
          />
        </div>
        <div className="modal-column">
          <label>Start Time</label>
          <input 
            type="datetime-local" 
            value={startTime} 
            onChange={(e) => setStartTime(e.target.value)} 
          />
        </div>
        <div className="modal-column">
          <label>End Time</label>
          <input 
            type="datetime-local" 
            value={endTime} 
            onChange={(e) => setEndTime(e.target.value)} 
          />
        </div>
        <div className="modal-column">
          <label>Location</label>
          <input 
            type="text" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            placeholder="Enter location" 
          />
        </div>
        <div className="modal-actions">
          <button onClick={handleSubmit}>Add Event</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddEventModal;
