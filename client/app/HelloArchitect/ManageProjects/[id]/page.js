'use client'; 

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getUserEmail } from '../../../utils/util';
import FormData from 'form-data';
import './style.css';
import Sidebar from '../../component/sidebar';
import Navbar from '../../component/navbar';
import '../../style.css';
import AddOpeningDateModal from './opening';
import AddVisitModal from './visit';
import '../modal.css';

const ProjectDetails = () => {
  const params = useParams();
  const { id } = params;
  const [openingDate, setOpeningDate] = useState(null); 
  const [closingDate, setClosingDate] = useState(null); 
  const [visits, setVisits] = useState([]); 
  const [isAddVisitModalOpen, setIsAddVisitModalOpen] = useState(false); 
  const [project, setProject] = useState(null);
  const email = getUserEmail();
  

  const [modalOpen, setModalOpen] = useState(false);

  const handleDateSubmit = (date) => {
    console.log("Opening Date Submitted: ", date);
    setModalOpen(false); 
  };

  useEffect(() => {
    const fetchProjectDetails = async () => {
      if (id && email) {
        try {
          const response = await axios.get(`http://localhost:5000/pr/projects/${id}`, {
            params: { email }
          });
          setProject(response.data);
        } catch (error) {
          console.error('Error fetching project details:', error);
        }
      }
    };

    fetchProjectDetails();
  }, [id, email]);

  if (!project) return <p>Loading...</p>;

  const handleCertificateUpload = async (certificateType, file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post(`http://localhost:5000/cr/projects/${id}/upload/certificate/${certificateType}/email/${email}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert(`${certificateType} uploaded successfully.`);
      setProject(prev => ({ 
        ...prev, 
        certificates: { 
          ...prev.certificates, 
          certificateFile: file.name,
          [certificateType]: true,
          [certificateType === 'certificateOccupancy' ? 'certificateConformity' : 'certificateOccupancy']: false 
        } 
      }));
    } catch (error) {
      console.error('Error uploading certificate:', error);
    }
  };

  const handleCertificateDelete = async (certificateType) => {
    try {
      await axios.delete(`http://localhost:5000/cr/projects/${id}/delete/certificate/${certificateType}/email/${email}`);
      setProject(prev => ({
        ...prev,
        certificates: {
          ...prev.certificates,
          certificateFile: '',
          [certificateType]: false,
        },
      }));
    } catch (error) {
      console.error('Error deleting certificate:', error);
    }
  };

  const handleCertificateDownload = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/cr/projects/${id}/download/certificate/email/${email}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', project.certificates.certificateFile);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading certificate:', error);
    }
  };
  const handleFileUpload = async (fileType, file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`http://localhost:5000/pr/projects/${id}/upload/${fileType}/email/${email}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        alert(`${fileType} uploaded successfully.`);
        setProject(prev => ({
          ...prev,
          files: { ...prev.files, [fileType]: file.name }
        }));
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleFileDelete = async (fileType) => {
    try {
      await axios.delete(`http://localhost:5000/pr/projects/${id}/delete/${fileType}/email/${email}`);
      setProject(prev => ({ ...prev, files: { ...prev.files, [fileType]: '' } }));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const handleDownload = async (fileType) => {
    try {
      const response = await axios.get(`http://localhost:5000/pr/projects/${id}/download/${fileType}/email/${email}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', project.files[fileType]);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };
 

  const handleOpeningDateSubmit = (date) => {
    setOpeningDate(date);
    alert('Opening date submitted');
  };

  const handleVisitSubmit = (visit) => {
    setVisits([...visits, visit]); 
    setIsAddVisitModalOpen(false);
    alert('Visit added');
  };

  const handleClosingDateSubmit = (date) => {
    setClosingDate(date);
    alert('Project closed, no more visits can be added');
  };

  return (
    <div className="profile-container">
     
      <Sidebar />

      <main className="main-content">  
        {/* <Navbar/> */}
        <div className="container">
        <div className="project-details">
          <div className='ro'>
    <h1>{project.name}</h1>
    <p><span className="label">Project For:</span> {project.projectFor}</p>
    <p><span className="label">Location:</span> {project.location}</p>
    <p><span className="label">Type:</span> {project.type}</p>
    
    {project.type === 'New Construction' && (
      <>
        <p><span className="label">N Floors:</span> RDC+{project.details.numberOfFloors}</p>
        <p><span className="label">Basement:</span> Base+{project.details.basement}</p>
      </>
    )}

    {project.type === 'Existing Construction' && (
      <>
        <p><span className="label">N Floors exist:</span> RDC+{project.details.RDCexist}</p>
        <p><span className="label">N Floor will be added:</span> +{project.details.nf_surelevation}</p>
        <p><span className="label">N Floor Total:</span> RDC+{project.details.nf_surelevation + project.details.RDCexist}</p>
      </> 
    )}</div>
    <div className="project-image">
    <img src='/images/architect.png' alt="Architect" />
  </div>
  </div>
  
  
          <div className="file-section">
          <h2>Files</h2>
            {['Demand', 'ArchitecturalPlan', 'ConstructionPlan', 'Contract'].map((fileType) => (
              <div key={fileType} className={`file-item ${project.files[fileType] ? 'uploaded' : ''}`}>
                <h3>{fileType.replace(/([A-Z])/g, ' $1')}</h3>
                {!project.files[fileType] && (
                  <div className="custom-file-input">
                    <input 
                      type="file" 
                      id={`file-input-${fileType}`} 
                      onChange={(e) => e.target.files.length > 0 && handleFileUpload(fileType, e.target.files[0])} 
                    />
                    <label htmlFor={`file-input-${fileType}`}>Upload</label>
                  </div>
                )}
                {project.files[fileType] && (
                  <div className="file-buttons">
                    <button className="download" onClick={() => handleDownload(fileType)}>Download</button>
                    <button className="delete" onClick={() => handleFileDelete(fileType)}>Delete</button>
                  </div>
                )}
              </div>
            ))}

            <h2>Certificates</h2>
            {['certificateOccupancy', 'certificateConformity'].map((certificateType) => (
              <div key={certificateType} className={`file-item ${project.certificates[certificateType] ? 'uploaded' : ''}`}>
                <h3>{certificateType.replace(/([A-Z])/g, ' $1')}</h3>
                {!project.certificates[certificateType] && !project.certificates[certificateType === 'certificateOccupancy' ? 'certificateConformity' : 'certificateOccupancy'] && (
                  <div className="custom-file-input">
                    <input 
                      type="file" 
                      id={`certificate-input-${certificateType}`} 
                      onChange={(e) => e.target.files.length > 0 && handleCertificateUpload(certificateType, e.target.files[0])} 
                    />
                    <label htmlFor={`certificate-input-${certificateType}`}>Upload</label>
                  </div>
                )}
                {project.certificates[certificateType] && (
                  <div className="file-buttons">
                    <button className="download" onClick={handleCertificateDownload}>Download</button>
                    <button className="delete" onClick={() => handleCertificateDelete(certificateType)}>Delete</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <FinanceTable/>
        <Project/>
      </main>
    </div>
  );
};





const Project = () => {
 

  
    const [openingDate, setOpeningDate] = useState('');
    const [closingDate, setClosingDate] = useState('');
    const [showOpeningModal, setShowOpeningModal] = useState(false);
    const [showVisitModal, setShowVisitModal] = useState(false);
    const [showClosingModal, setShowClosingModal] = useState(false);
    const [visits, setVisits] = useState([]);
    const [currentVisit, setCurrentVisit] = useState({
      name: '',
      description: '',
      date: '',
      file: null,
      imageUrl: '', // For storing image URL
    });
  
    const handleOpeningDateSubmit = () => {
      if (!openingDate) {
        alert('Please select an opening date.');
      } else {
        setShowOpeningModal(false);
      }
    };
  
    const handleClosingDateSubmit = () => {
      if (!closingDate) {
        alert('Please select a closing date.');
      } else {
        setShowClosingModal(false);
      }
    };
  
    const handleVisitSubmit = () => {
      if (currentVisit.file && currentVisit.name && currentVisit.description && currentVisit.date) {
        setVisits([...visits, currentVisit]);
        setShowVisitModal(false);
        setCurrentVisit({ name: '', description: '', date: '', file: null, imageUrl: '' });
      } else {
        alert('Please provide all required details or upload a file.');
      }
    };
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setCurrentVisit({ ...currentVisit, file, imageUrl: reader.result });
        };
        reader.readAsDataURL(file); // Converts the image file into a URL for display
      }
    };
  
    return (
      <div className="project-container">
        <h1>Project Management</h1>
  
        {/* Opening Date Modal */}
        {showOpeningModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Set Opening Date</h2>
              <div className="modal-form">
                <div className="modal-column">
                  <input
                    type="date"
                    value={openingDate}
                    onChange={(e) => setOpeningDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button onClick={handleOpeningDateSubmit}>Submit Opening Date</button>
                <button onClick={() => setShowOpeningModal(false)}>Close</button>
              </div>
            </div>
          </div>
        )}
  
        {/* Closing Date Modal */}
        {showClosingModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Set Closing Date</h2>
              <div className="modal-form">
                <div className="modal-column">
                  <input
                    type="date"
                    value={closingDate}
                    onChange={(e) => setClosingDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button onClick={handleClosingDateSubmit}>Submit Closing Date</button>
                <button onClick={() => setShowClosingModal(false)}>Close</button>
              </div>
            </div>
          </div>
        )}
  
        {/* Display Opening & Closing Date */}
        <div className="date-section">
          {closingDate ? (
            <p><strong>Closing Date:</strong> {closingDate}</p>
          ) : (
            <div>
              <p><strong>Opening Date:</strong> {openingDate || 'Not set'}</p>
              {!openingDate && (
                <button onClick={() => setShowOpeningModal(true)} className="main-btn">Set Opening Date</button>
              )}
            </div>
          )}
        </div>
  
        {/* List Visits */}
        <div className="visits-section">
          {visits.map((visit, index) => (
            <div key={index} className="visit-card">
              <h2>Visit {index + 1}</h2>
             
                <div>
                  
                  <img src={visit.imageUrl} alt={`Visit ${index + 1}`} className="visit-image" />
                </div>
              
                <div>
              
                <p><strong>Name:</strong> {visit.name}</p>
                <p><strong>Description:</strong> {visit.description}</p>
                <p><strong>Date:</strong> {visit.date}</p>
                </div>

             
            </div>
          ))}
        </div>
  
        {/* Add Visit Button */}
        {openingDate && !closingDate && (
          <div className="visit-btn-section">
            <button onClick={() => setShowVisitModal(true)} className="main-btn">Add Visit</button>
  
            {/* Visit Modal */}
            {showVisitModal && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <h2>Add Visit</h2>
                  <div className="modal-form">
                    <div className="modal-column">
                      <input
                        type="text"
                        placeholder="Name"
                        value={currentVisit.name}
                        onChange={(e) => setCurrentVisit({ ...currentVisit, name: e.target.value })}
                        disabled={currentVisit.file !== null}
                      />
                      <input
                        type="text"
                        placeholder="Description"
                        value={currentVisit.description}
                        onChange={(e) => setCurrentVisit({ ...currentVisit, description: e.target.value })}
                        disabled={currentVisit.file !== null}
                      />
                      <input
                        type="date"
                        value={currentVisit.date}
                        onChange={(e) => setCurrentVisit({ ...currentVisit, date: e.target.value })}
                        disabled={currentVisit.file !== null}
                      />
                    </div>
                    <div className="modal-column">
                      <input
                        type="file"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                  <div className="modal-actions">
                    <button onClick={handleVisitSubmit}>Submit Visit</button>
                    <button onClick={() => setShowVisitModal(false)}>Close</button>
                  </div>
                </div>
              </div>
            )}
  
            {/* Closing Date Button */}
            {visits.length > 0 && (
              <button onClick={() => setShowClosingModal(true)} className="main-btn">Set Closing Date</button>
            )}
          </div>
        )}
      </div>
    );
  }

const FinanceTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [initialAmount, setInitialAmount] = useState(''); // Enter only once
  const [advance, setAdvance] = useState('');
  const [rows, setRows] = useState([]);

  // Handle adding a new entry row
  const handleAddEntry = () => {
    if (rows.length === 0 && !initialAmount) {
      alert('Please enter the initial amount first.');
      return;
    }

    if (!advance) {
      alert('Please enter an advance.');
      return;
    }

    // Calculate new row data
    const lastRow = rows[rows.length - 1] || { total: parseFloat(initialAmount), advance: 0 };
    const newAdvance = parseFloat(advance);
    const newTotal = lastRow.total + newAdvance;
    const newAmountDiff = lastRow.total - newAdvance;

    const newRow = {
      advance: newAdvance,
      total: newTotal,
      amount: newAmountDiff,
      date: new Date().toISOString().slice(0, 10), // Auto-generate date
    };

    setRows([...rows, newRow]);
    setShowModal(false);
    setAdvance('');
  };

  return (
    <div className="finance-container">
      <h1>Finance Table</h1>

      {/* Initial Amount Entry */}
      {rows.length === 0 && (
        <div className="initial-amount">
          <input
            type="number"
            value={initialAmount}
            onChange={(e) => setInitialAmount(e.target.value)}
            placeholder="Enter Initial Amount"
          />
          <button className="add-btn" onClick={() => setRows([{ date: new Date().toISOString().slice(0, 10), advance: 0, amount: parseFloat(initialAmount), total: parseFloat(initialAmount) }])}>
            Set Initial Amount
          </button>
        </div>
      )}

      {/* Table */}
      <table className="finance-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Advance</th>
            <th>Amount</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.date}</td>
              <td>{row.advance}</td>
              <td>{row.amount}</td>
              <td>{row.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Button */}
      {rows.length > 0 && (
        <button className="add-btn" onClick={() => setShowModal(true)}>Add Advance</button>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add Advance</h2>
            <div className="modal-form">
              <input
                type="number"
                value={advance}
                onChange={(e) => setAdvance(e.target.value)}
                placeholder="Enter Advance"
              />
            </div>
            <div className="modal-actions">
              <button onClick={handleAddEntry}>Submit</button>
              <button onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default ProjectDetails;
