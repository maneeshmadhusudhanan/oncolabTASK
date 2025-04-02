const express = require('express');
const router = express.Router();
const Bill = require('../models/Bill');
const Patient = require('../models/Patient');
const Checkup = require('../models/Checkup');
const auth = require('../middleware/auth');

// Get all bills
router.get('/', auth, async (req, res) => {
  try {
    const bills = await Bill.find()
      .sort({ billDate: -1 })
      .populate('patient')
      .populate('checkup');
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single bill
router.get('/:id', auth, async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id)
      .populate('patient')
      .populate('checkup');
    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    res.json(bill);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create bill
router.post('/', auth, async (req, res) => {
  try {
    const patient = await Patient.findById(req.body.patient);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const checkup = await Checkup.findById(req.body.checkup);
    if (req.body.checkup && !checkup) {
      return res.status(404).json({ message: 'Checkup not found' });
    }

    const bill = new Bill(req.body);
    await bill.save();
    
    res.status(201).json(bill);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update bill
router.put('/:id', auth, async (req, res) => {
  try {
    const bill = await Bill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    res.json(bill);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete bill
router.delete('/:id', auth, async (req, res) => {
  try {
    const bill = await Bill.findByIdAndDelete(req.params.id);
    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    res.json({ message: 'Bill deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get billing reports
router.get('/reports', auth, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    let query = {};
    if (startDate) {
      query.billDate = { $gte: new Date(startDate) };
    }
    if (endDate) {
      query.billDate = query.billDate || {};
      query.billDate.$lte = new Date(endDate);
    }

    const bills = await Bill.find(query)
      .populate('patient')
      .populate('checkup');

    const totalAmount = bills.reduce((sum, bill) => sum + bill.amount, 0);
    const pendingCount = bills.filter(bill => bill.status === 'pending').length;
    const paidCount = bills.filter(bill => bill.status === 'paid').length;

    res.json({
      totalBills: bills.length,
      totalAmount,
      pendingCount,
      paidCount,
      bills
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
