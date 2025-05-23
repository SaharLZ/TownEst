import React from 'react'

import { useState } from 'react';
import '../modal.css'


const AddOpeningDateModal = ({ setModalOpen, onSubmit }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add Opening Date</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select a Date:
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="flex justify-between">
          {/* Button to submit today's date */}
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md"
            onClick={() => onSubmit(today)} // Submit today's date
          >
            Today
          </button>

          {/* Button to submit the selected date */}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={() => onSubmit(selectedDate)} // Submit selected date
            disabled={!selectedDate} // Disable if no date is selected
          >
            Submit
          </button>

          {/* Cancel button */}
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={() => setModalOpen(false)} // Close the modal
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddOpeningDateModal;

