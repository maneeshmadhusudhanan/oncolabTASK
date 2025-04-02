import React, { useState } from 'react';

const RiderTracking = () => {
  const [trackingId, setTrackingId] = useState('');

  // Mock data - replace with actual API call
  const deliveries = [
    {
      id: 'D001',
      status: 'In Transit',
      location: 'City Hospital',
      estimatedArrival: '15:30',
      rider: 'Alex Johnson',
      sampleType: 'Blood Sample',
      priority: 'High'
    },
    {
      id: 'D002',
      status: 'Picked Up',
      location: 'Medical Center',
      estimatedArrival: '16:00',
      rider: 'Sarah Smith',
      sampleType: 'Tissue Sample',
      priority: 'Medium'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Sample Tracking</h1>

      <div className="mb-8">
        <div className="max-w-md">
          <label htmlFor="tracking" className="block text-sm font-medium text-gray-700 mb-2">
            Track Sample
          </label>
          <div className="flex gap-4">
            <input
              type="text"
              id="tracking"
              placeholder="Enter tracking ID"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
            />
            <button className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
              Track
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {deliveries.map((delivery) => (
          <div key={delivery.id} className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Tracking ID: {delivery.id}
                </h2>
                <p className="text-gray-500">{delivery.sampleType}</p>
              </div>
              <span className={delivery.status === 'In Transit' ? 'px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800' : 'px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800'}>
                {delivery.status}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <span className="text-gray-600">Current Location:</span>
                  <span className="ml-2 font-medium">{delivery.location}</span>
                </div>
                <div>
                  <span className="text-gray-600">Estimated Arrival:</span>
                  <span className="ml-2 font-medium">{delivery.estimatedArrival}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-600">Rider:</span>
                  <span className="ml-2 font-medium">{delivery.rider}</span>
                </div>
                <div>
                  <span className="text-gray-600">Priority:</span>
                  <span className={delivery.priority === 'High' ? 'ml-2 font-medium text-red-600' : 'ml-2 font-medium text-yellow-600'}>
                    {delivery.priority}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiderTracking;
