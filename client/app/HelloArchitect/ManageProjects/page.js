'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AddProjectModal from './modal';
import '../style.css';
import './Project.css';
import Sidebar from '../component/sidebar';
import axios from 'axios';
import { getUserEmail } from '../../utils/util'; 

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const email = getUserEmail(); 

  useEffect(() => {
    if (email) {
      axios.get(`http://localhost:5000/pr/projects`, {
        params: { email }  
      })
        .then(response => setProjects(response.data))
        .catch(error => console.error('Error fetching projects:', error));
    }
  }, [email]);

  const handleAddProject = (newProject) => {
    setProjects([...projects, newProject]);
  };

  return (
    <div className="profile-container">
      <Sidebar />

      <main className="main-content">
        <header className="header">
          <h2>Projects</h2>
        </header>

        <button className="add-project-button" onClick={() => setIsModalOpen(true)}>
          Add Project
        </button>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Project Owner</th>
                <th>Type</th>
                <th>RDC exist</th>
                <th>nf sur elevation</th>
                <th>n Floor</th>
                <th>Basement</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr key={index}>
                  <td>{project.name}</td>
                  <td>{project.projectFor}</td>
                  <td>{project.type}</td>
                  <td>RDC+{project.details.RDCexist}</td>
                  <td>{project.details.nf_surelevation}</td>
                  <td>RDC+{project.details.numberOfFloors}</td>
                  <td>{project.details.basement}</td>
                  <td>{project.location}</td>
                  <td>
                    <Link href={`/HelloArchitect/ManageProjects/${project._id}`}>Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AddProjectModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={handleAddProject}
        />
      </main>
    </div>
  );
};

export default ProjectsPage;
