import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import BillingForm from '../components/BillingForm';
import Payment from '../components/Payment';

const Billing = () => {
  const { id } = useParams();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('online');

  // Mock data - replace with API call
  const patientBilling = {
    patientId: id,
    patientName: 'MANEESH',
    totalAmount: 1500.00,
    services: [
      { id: 1, name: 'Blood Test', cost: 500.00 },
      { id: 2, name: 'X-Ray', cost: 700.00 },
      { id: 3, name: 'Consultation', cost: 300.00 }
    ],
    insurance: {
      provider: 'MediCare',
      coveragePercentage: 80
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-8">Billing Details</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Patient Information</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Patient ID:</span> {patientBilling.patientId}</p>
            <p><span className="font-medium">Name:</span> {patientBilling.patientName}</p>
            <p><span className="font-medium">Insurance Provider:</span> {patientBilling.insurance.provider}</p>
            <p><span className="font-medium">Coverage:</span> {patientBilling.insurance.coveragePercentage}%</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Services & Charges</h2>
          <div className="space-y-4">
            {patientBilling.services.map(service => (
              <div key={service.id} className="flex justify-between items-center border-b pb-2">
                <span>{service.name}</span>
                <span className="font-medium">${service.cost.toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between items-center pt-2 font-bold">
              <span>Total Amount</span>
              <span>${patientBilling.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <BillingForm patientBilling={patientBilling} />
      </div>

      <div className="mt-8">
        <Payment 
          amount={patientBilling.totalAmount} 
          selectedMethod={selectedPaymentMethod}
          onMethodChange={setSelectedPaymentMethod}
        />
      </div>
    </div>
  );
};

export default Billing;
