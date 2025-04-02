import React, { useState } from 'react';

const LabTestForm = ({ patientId }) => {
  const [testData, setTestData] = useState({
    testType: '',
    testDate: '',
    sampleType: '',
    labTechnician: '',
    notes: ''
  });

  const handleChange = (e) => {
    setTestData({
      ...testData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Lab test form submitted:', { patientId, ...testData });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">New Lab Test</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Test Type
            </label>
            <select
              name="testType"
              value={testData.testType}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-primary focus:border-primary"
              required
            >
              <option value="">Select Test Type</option>
              <option value="blood">Blood Test</option>
              <option value="urine">Urine Analysis</option>
              <option value="xray">X-Ray</option>
              <option value="mri">MRI</option>
              <option value="ct">CT Scan</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Test Date
            </label>
            <input
              type="date"
              name="testDate"
              value={testData.testDate}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-primary focus:border-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sample Type
            </label>
            <input
              type="text"
              name="sampleType"
              value={testData.sampleType}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-primary focus:border-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lab Technician
            </label>
            <input
              type="text"
              name="labTechnician"
              value={testData.labTechnician}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-primary focus:border-primary"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            name="notes"
            value={testData.notes}
            onChange={handleChange}
            rows="4"
            className="w-full p-2 border rounded-md focus:ring-primary focus:border-primary"
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
          >
            Submit Test Results
          </button>
        </div>
      </form>
    </div>
  );
};

export default LabTestForm;
