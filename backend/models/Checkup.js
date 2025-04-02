const mongoose = require('mongoose');

const checkupSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  checkupDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  doctorName: {
    type: String,
    required: true,
    trim: true
  },
  symptoms: {
    type: String,
    trim: true
  },
  diagnosis: {
    type: String,
    trim: true
  },
  treatmentPlan: {
    type: String,
    trim: true
  },
  nextAppointment: {
    type: Date
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to update updatedAt timestamp
checkupSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Checkup = mongoose.model('Checkup', checkupSchema);

module.exports = Checkup;
