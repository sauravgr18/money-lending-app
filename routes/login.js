const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ status: 'error', message: 'Invalid email or password.' });
    }

    // Check the password in plain text
    if (password !== user.password) {
      return res.status(400).json({ status: 'error', message: 'Invalid email or password.' });
    }

    // Create a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with token
    res.status(200).json({ status: 'success', token });
  } catch (error) {
    console.error('Error during login:', error); // Log error for debugging
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

module.exports = router;
