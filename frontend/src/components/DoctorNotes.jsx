import React, { useState } from 'react';

const DoctorNotes = ({ patientId }) => {
  const [note, setNote] = useState('');
  
  // Mock data - replace with API call
  const existingNotes = [
    {
      id: 1,
      date: '2025-04-01',
      doctor: 'Dr. Sarah Smith',
      content: 'Patient shows good progress. Blood pressure has normalized.',
      prescription: 'Continue with current medication.'
    },
    {
      id: 2,
      date: '2025-03-15',
      doctor: 'Dr. John Doe',
      content: 'Initial consultation. Patient reports occasional headaches.',
      prescription: 'Prescribed pain medication and recommended rest.'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle note submission
    console.log('Doctor note submitted:', { patientId, note });
    setNote('');
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Add Note</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Clinical Notes
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows="4"
              className="w-full p-2 border rounded-md focus:ring-primary focus:border-primary"
              placeholder="Enter your clinical notes here..."
              required
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
            >
              Add Note
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Previous Notes</h2>
        <div className="space-y-4">
          {existingNotes.map(note => (
            <div
              key={note.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-sm text-gray-500">{note.date}</p>
                  <p className="font-medium">{note.doctor}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <h4 className="font-medium">Clinical Notes</h4>
                  <p className="text-gray-600 mt-1">{note.content}</p>
                </div>
                <div>
                  <h4 className="font-medium">Prescription</h4>
                  <p className="text-gray-600 mt-1">{note.prescription}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorNotes;
