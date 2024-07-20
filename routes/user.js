const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authenticate = require('../middleware/authenticate');

// GET /user - Show user data
router.get('/', authenticate, async (req, res) => {
  try {
    // Find the user by their ID (obtained from the authentication middleware)
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    // Respond with the user data
    res.status(200).json({
      status: 'success',
      data: {
        purchasePowerAmount: user.purchasePowerAmount || 0, // Assuming a default value of 0 if not set
        phone: user.phone,
        email: user.email,
        dateOfRegistration: user.dateOfRegistration,
        dob: user.dob,
        monthlySalary: user.monthlySalary
      }
    });
  } catch (error) {
    console.error('Error fetching user data:', error); // Log error for debugging
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

module.exports = router;
