import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import BillingSection from '../components/BillingSection';
import PaymentSetup from '../components/PaymentSetup';

const PatientDetails = () => {
  const { id } = useParams();

  // Mock data - replace with actual API call
  const [activeTab, setActiveTab] = useState('details');

  // Mock data - replace with actual API call
  const patient = {
    id: id,
    name: 'MANEESH',
    age: 33,
    status: 'Active',
    testType: 'Blood Analysis',
    sampleDate: '2025-03-30',
    diagnosis: 'Pending',
    doctorNotes: 'Patient shows typical symptoms...',
    testResults: [
      { date: '2025-03-30', type: 'Blood Count', status: 'Completed' },
      { date: '2025-03-29', type: 'Biopsy', status: 'Processing' }
    ],
    bills: [
      {
        date: '2025-03-30',
        service: 'Blood Analysis',
        type: 'Laboratory Test',
        amount: 150.00,
        status: 'Pending'
      },
      {
        date: '2025-03-29',
        service: 'Consultation',
        type: 'Doctor Visit',
        amount: 100.00,
        status: 'Paid'
      },
      {
        date: '2025-03-29',
        service: 'Biopsy',
        type: 'Laboratory Test',
        amount: 300.00,
        status: 'Pending'
      }
    ]
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('details')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'details'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Patient Details
          </button>
          <button
            onClick={() => setActiveTab('billing')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'billing'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Billing & Payments
          </button>
        </nav>
      </div>
      {activeTab === 'details' ? (
        <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{patient.name}</h1>
            <p className="text-gray-500">Patient ID: {patient.id}</p>
          </div>
          <span className={patient.status === 'Active' ? 'px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800' : 'px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800'}>
            {patient.status}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Patient Information</h2>
            <div className="space-y-3">
              <div>
                <span className="text-gray-600">Age:</span>
                <span className="ml-2 font-medium">{patient.age}</span>
              </div>
              <div>
                <span className="text-gray-600">Test Type:</span>
                <span className="ml-2 font-medium">{patient.testType}</span>
              </div>
              <div>
                <span className="text-gray-600">Sample Date:</span>
                <span className="ml-2 font-medium">{patient.sampleDate}</span>
              </div>
              <div>
                <span className="text-gray-600">Diagnosis:</span>
                <span className="ml-2 font-medium">{patient.diagnosis}</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Test Results</h2>
            <div className="space-y-4">
              {patient.testResults.map((test, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{test.type}</span>
                    <span className={`text-sm ${
                      test.status === 'Completed' 
                        ? 'text-green-600' 
                        : 'text-yellow-600'
                    }`}>
                      {test.status}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">{test.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Doctor's Notes</h2>
          <p className="text-gray-700">{patient.doctorNotes}</p>
        </div>
      </div>
      ) : (
        <div className="space-y-6">
          <BillingSection bills={patient.bills} />
          <PaymentSetup />
        </div>
      )}
    </div>
  );
};

export default PatientDetails;
