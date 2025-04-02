import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import LabTestForm from './LabTestForm';
import MedicalReport from './MedicalReport';
import DoctorNotes from './DoctorNotes';

const CheckupDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('history');

  // Mock data - replace with API call
  const checkupData = {
    patientId: id,
    patientName: 'MANEESH',
    age: 33,
    checkupDate: '2025-04-01',
    history: [
      {
        date: '2025-03-15',
        type: 'Blood Test',
        result: 'Normal',
        doctor: 'Dr. Sarah Smith'
      },
      {
        date: '2025-02-01',
        type: 'X-Ray',
        result: 'No abnormalities',
        doctor: 'Dr. John Doe'
      }
    ],
    currentTests: [
      {
        id: 1,
        name: 'Complete Blood Count',
        status: 'Completed',
        result: 'Normal range'
      },
      {
        id: 2,
        name: 'Liver Function Test',
        status: 'Pending',
        result: null
      }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-8">Checkup Details</h1>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Patient Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><span className="font-medium">Patient ID:</span> {checkupData.patientId}</p>
            <p><span className="font-medium">Name:</span> {checkupData.patientName}</p>
          </div>
          <div>
            <p><span className="font-medium">Age:</span> {checkupData.age}</p>
            <p><span className="font-medium">Checkup Date:</span> {checkupData.checkupDate}</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('history')}
              className={`py-4 px-1 ${
                activeTab === 'history'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-primary'
              }`}
            >
              Medical History
            </button>
            <button
              onClick={() => setActiveTab('tests')}
              className={`py-4 px-1 ${
                activeTab === 'tests'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-primary'
              }`}
            >
              Current Tests
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`py-4 px-1 ${
                activeTab === 'notes'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-primary'
              }`}
            >
              Doctor's Notes
            </button>
          </nav>
        </div>

        <div className="mt-8">
          {activeTab === 'history' && (
            <div className="space-y-6">
              {checkupData.history.map((record, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">{record.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Type</p>
                      <p className="font-medium">{record.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Result</p>
                      <p className="font-medium">{record.result}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Doctor</p>
                      <p className="font-medium">{record.doctor}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'tests' && (
            <div className="space-y-8">
              <LabTestForm patientId={id} />
              <MedicalReport tests={checkupData.currentTests} />
            </div>
          )}

          {activeTab === 'notes' && (
            <DoctorNotes patientId={id} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckupDetails;
