'use client';

import React, { useState } from 'react';
import axios from 'axios';
import './modal.css';
import { getUserEmail } from '../../utils/util';

const AddProjectModal = ({ isOpen, onClose }) => {
  const [projectName, setProjectName] = useState('');
  const [projectFor, setProjectFor] = useState('');
  const [type, setType] = useState('');
  const [RDCexist, setRDCexist] = useState(''); 
  const [basement, setBasement] = useState(''); 
  const [numberOfFloors, setNumberOfFloors] = useState(''); 
  const [nf_surelevation, setnf_surelevation] = useState(''); 
  const [location, setLocation] = useState('');

  const handleTypeChange = (e) => {
    setType(e.target.value);
    setRDCexist('');
    setBasement('');
    setNumberOfFloors('');
    setnf_surelevation('');
  };

  const handleSubmit = async () => {
    const userEmail = getUserEmail();
    
    const newProject = {
      email: userEmail,
      projectName,
      projectFor,
      type,
   
      RDCexist: type === 'Existing Construction' ? Number(RDCexist) : null,
      basement: type === 'New Construction' ? Number(basement) : null,
      nf_surelevation: type === 'Existing Construction' ? Number(nf_surelevation) : null,
      numberOfFloors: type === 'New Construction' ? Number(numberOfFloors) : null,
      location,
    };
  
    try {
      const response = await axios.post('http://localhost:5000/pr/project', newProject);
      if (response.status === 201) {
        console.log('Project added successfully:', response.data);
      } else {
        console.log('Failed to add project');
      }
    } catch (error) {
      console.error('Error adding project:', error);
    }
  
    onClose(); 
  };
  

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Project</h2>
        <div className="modal-form">
          <div className="modal-column">
            <input
              type="text"
              placeholder="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Project For"
              value={projectFor}
              onChange={(e) => setProjectFor(e.target.value)}
            />
            <select value={type} onChange={handleTypeChange}>
              <option value="">Select Type</option>
              <option value="New Construction">New Construction</option>
              <option value="Existing Construction">Existing Construction</option>
            </select>
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="modal-column">
            {type === 'New Construction' && (
              <>
                 <select
                  value={basement}
                  onChange={(e) => setBasement(e.target.value)}
                  >
                    <option value="">Select Basement</option>
                    <option value="1">1 Basement(sous-sol)</option>
                    <option value="2">2 Basement(sous-sol)</option>
                 </select>
                <input
                  type="number"
                  placeholder="RDC + (n) Floor"
                  value={numberOfFloors}
                  onChange={(e) => setNumberOfFloors(e.target.value)}
                />
              </>
            )}
            {type === 'Existing Construction' && (
              <>
                <input
                  type="number"
                  placeholder="RDC + (n) Floor"
                  value={RDCexist}
                  onChange={(e) => setRDCexist(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Number of Floors (sur elevation)"
                  value={nf_surelevation}
                  onChange={(e) => setnf_surelevation(e.target.value)}
                />
              </>
            )}
          </div>
        </div>

        <div className="modal-actions">
          <button onClick={handleSubmit}>Add Project</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddProjectModal;
