const express = require('express');
const router = express.Router();
const Checkup = require('../models/Checkup');
const Patient = require('../models/Patient');
const auth = require('../middleware/auth');

// Get all checkups
router.get('/', auth, async (req, res) => {
  try {
    const checkups = await Checkup.find()
      .sort({ checkupDate: -1 })
      .populate('patient');
    res.json(checkups);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single checkup
router.get('/:id', auth, async (req, res) => {
  try {
    const checkup = await Checkup.findById(req.params.id)
      .populate('patient');
    if (!checkup) {
      return res.status(404).json({ message: 'Checkup not found' });
    }
    res.json(checkup);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create checkup
router.post('/', auth, async (req, res) => {
  try {
    const patient = await Patient.findById(req.body.patient);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const checkup = new Checkup(req.body);
    await checkup.save();
    
    res.status(201).json(checkup);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update checkup
router.put('/:id', auth, async (req, res) => {
  try {
    const checkup = await Checkup.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!checkup) {
      return res.status(404).json({ message: 'Checkup not found' });
    }
    res.json(checkup);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete checkup
router.delete('/:id', auth, async (req, res) => {
  try {
    const checkup = await Checkup.findByIdAndDelete(req.params.id);
    if (!checkup) {
      return res.status(404).json({ message: 'Checkup not found' });
    }
    res.json({ message: 'Checkup deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
