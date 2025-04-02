import React, { useState } from 'react';

const Payment = ({ amount, selectedMethod, onMethodChange }) => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handleCardDetailsChange = (e) => {
    setCardDetails({
      ...cardDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Payment submitted:', { method: selectedMethod, cardDetails });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Payment</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Select Payment Method</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            className={`p-4 border rounded-lg flex items-center justify-center ${
              selectedMethod === 'online' ? 'border-primary bg-primary/10' : 'border-gray-200'
            }`}
            onClick={() => onMethodChange('online')}
          >
            <span className="font-medium">Online Payment</span>
          </button>
          <button
            className={`p-4 border rounded-lg flex items-center justify-center ${
              selectedMethod === 'cash' ? 'border-primary bg-primary/10' : 'border-gray-200'
            }`}
            onClick={() => onMethodChange('cash')}
          >
            <span className="font-medium">Cash</span>
          </button>
          <button
            className={`p-4 border rounded-lg flex items-center justify-center ${
              selectedMethod === 'insurance' ? 'border-primary bg-primary/10' : 'border-gray-200'
            }`}
            onClick={() => onMethodChange('insurance')}
          >
            <span className="font-medium">Insurance</span>
          </button>
        </div>
      </div>

      {selectedMethod === 'online' && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Number
            </label>
            <input
              type="text"
              name="cardNumber"
              value={cardDetails.cardNumber}
              onChange={handleCardDetailsChange}
              className="w-full p-2 border rounded-md focus:ring-primary focus:border-primary"
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                name="expiryDate"
                value={cardDetails.expiryDate}
                onChange={handleCardDetailsChange}
                className="w-full p-2 border rounded-md focus:ring-primary focus:border-primary"
                placeholder="MM/YY"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVV
              </label>
              <input
                type="text"
                name="cvv"
                value={cardDetails.cvv}
                onChange={handleCardDetailsChange}
                className="w-full p-2 border rounded-md focus:ring-primary focus:border-primary"
                placeholder="123"
                required
              />
            </div>
          </div>
          <div className="flex justify-between items-center pt-4">
            <div className="text-lg font-semibold">
              Total Amount: <span className="text-primary">${amount.toFixed(2)}</span>
            </div>
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
            >
              Pay Now
            </button>
          </div>
        </form>
      )}

      {selectedMethod === 'cash' && (
        <div className="mt-4">
          <p className="text-gray-600">Please pay at the reception counter.</p>
          <div className="flex justify-between items-center mt-4">
            <div className="text-lg font-semibold">
              Total Amount: <span className="text-primary">${amount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      {selectedMethod === 'insurance' && (
        <div className="mt-4">
          <p className="text-gray-600">Please submit your insurance details for processing.</p>
          <div className="flex justify-between items-center mt-4">
            <div className="text-lg font-semibold">
              Total Amount: <span className="text-primary">${amount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
