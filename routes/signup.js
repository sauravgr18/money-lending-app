const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
  const { phone, email, name, dob, monthlySalary, password } = req.body;

  // Validation
  const age = new Date().getFullYear() - new Date(dob).getFullYear();
  if (age < 20) {
    return res.status(400).json({ status: 'rejected', message: 'User must be at least 20 years old.' });
  }
  if (monthlySalary < 25000) {
    return res.status(400).json({ status: 'rejected', message: 'Monthly salary must be at least 25k.' });
  }

  try {
    // Create new user
    const newUser = new User({
      phone,
      email,
      name,
      dateOfRegistration: new Date(),
      dob,
      monthlySalary,
      password, // Store plain text password
      status: 'approved'
    });

    await newUser.save();
    res.status(201).json({ status: 'approved', message: 'User registered successfully.' });
  } catch (error) {
    console.error('Error during user registration:', error); // Log error for debugging
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

module.exports = router;
