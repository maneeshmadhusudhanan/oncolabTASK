import React from 'react';
import { Link } from 'react-router-dom';

const PatientCard = ({ patient }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {patient.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">ID: {patient.id}</p>
        </div>
        <span className={patient.status === 'Active' ? 'px-2 py-1 text-xs rounded-full bg-green-100 text-green-800' : 'px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800'}>
          {patient.status}
        </span>
      </div>

      <div className="mt-4 space-y-2">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Age:</span> {patient.age}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Test Type:</span> {patient.testType}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Sample Date:</span> {patient.sampleDate}
        </p>
      </div>

      <div className="mt-6">
        <Link
          to={'/patients/' + patient.id}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PatientCard;
