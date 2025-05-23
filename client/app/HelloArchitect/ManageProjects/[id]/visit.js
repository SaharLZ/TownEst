import { useState } from 'react';

const AddVisitModal = ({ onSubmit, minDate }) => {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [openingDate, setOpeningDate] = useState('');
  const [observation, setObservation] = useState('');

  const handlePhotoUpload = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (new Date(openingDate) >= new Date(minDate)) {
      onSubmit({ name, photo, openingDate, observation });
    } else {
      alert('Visit date cannot be before project opening date');
    }
  };

  return (
    <div className="modal">
      <h2>Add Visit</h2>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Visit Name" 
      />
      <input 
        type="date" 
        value={openingDate} 
        onChange={(e) => setOpeningDate(e.target.value)} 
        min={minDate} 
      />
      <textarea 
        value={observation} 
        onChange={(e) => setObservation(e.target.value)} 
        placeholder="Observation"
      />
      <input type="file" onChange={handlePhotoUpload} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AddVisitModal;
