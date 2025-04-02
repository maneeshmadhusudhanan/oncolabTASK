import React from 'react';

const MedicalReport = ({ tests }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Medical Report</h2>
      <div className="space-y-4">
        {tests.map(test => (
          <div
            key={test.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-lg">{test.name}</h3>
                <p className="text-gray-600 mt-1">
                  Status:{' '}
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-sm ${
                      test.status === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {test.status}
                  </span>
                </p>
              </div>
              {test.status === 'Completed' && (
                <button
                  className="text-primary hover:text-primary-dark"
                  onClick={() => {
                    // Handle download report
                    console.log('Downloading report for test:', test.id);
                  }}
                >
                  Download Report
                </button>
              )}
            </div>
            {test.result && (
              <div className="mt-4">
                <h4 className="font-medium">Results</h4>
                <p className="text-gray-600 mt-1">{test.result}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalReport;
