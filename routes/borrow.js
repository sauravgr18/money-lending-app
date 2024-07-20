const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// POST /borrow - Allow user to borrow money
router.post('/', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    const userId = decoded.id;

    const { amount, tenure } = req.body; // Amount to borrow and tenure in months

    if (!amount || !tenure) {
      return res.status(400).json({ status: 'error', message: 'Amount and tenure are required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    // Update purchase power amount
    user.purchasePowerAmount -= amount;
    if (user.purchasePowerAmount < 0) {
      return res.status(400).json({ status: 'error', message: 'Insufficient purchase power amount' });
    }

    // Calculate monthly repayment amount
    const monthlyInterestRate = 0.08 / 12;
    const monthlyRepayment = (amount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -tenure));

    await user.save();

    res.status(200).json({
      status: 'success',
      updatedPurchasePowerAmount: user.purchasePowerAmount,
      monthlyRepayment: monthlyRepayment.toFixed(2),
      tenure
    });
  } catch (error) {
    console.error('Error during borrow:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

module.exports = router;
