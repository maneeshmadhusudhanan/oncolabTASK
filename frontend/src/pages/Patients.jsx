import React, { useState } from 'react';
import PatientCard from '../components/PatientCard';

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data - replace with actual API call
  const mockPatients = [
    {
      id: 'P001',
      name: 'John Doe',
      age: 45,
      status: 'Active',
      testType: 'Blood Analysis',
      sampleDate: '2025-03-30',
    },
    {
      id: 'P002',
      name: 'Jane Smith',
      age: 38,
      status: 'Completed',
      testType: 'Tissue Biopsy',
      sampleDate: '2025-03-29',
    },
    {
      id: 'P003',
      name: 'Robert Johnson',
      age: 52,
      status: 'Active',
      testType: 'Molecular Testing',
      sampleDate: '2025-03-28',
    },
  ];

  const filteredPatients = mockPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || patient.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
          Patients
        </h1>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search patients..."
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => (
          <PatientCard key={patient.id} patient={patient} />
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No patients found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Patients;
