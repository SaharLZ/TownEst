import { useState } from 'react';

const AddOpeningDateModal = ({ onSubmit }) => {
  const [openingDate, setOpeningDate] = useState('');

  const handleSubmit = () => {
    if (openingDate) {
      onSubmit(openingDate);
    }
  };

  return (
    <div className="modal">
      <h2>Add Opening Date</h2>
      <input 
        type="date" 
        value={openingDate} 
        onChange={(e) => setOpeningDate(e.target.value)} 
      />
       
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AddOpeningDateModal;
