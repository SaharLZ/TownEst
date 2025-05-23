const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Architect = require('../models/architect'); 
const router = express.Router();


// Register route
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists
    let user = await Architect.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Architect already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user without sending `null` for phone
    user = new Architect({
      email,
      password: hashedPassword,
      // Ensure phone is not included if it's null
    });

    // Save the user
    await user.save();

    res.status(200).json({
      message: 'User registered successfully',
      user: { _id: user._id, email: user.email },
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(520).json({ message: 'Server error', error });
  }
});


// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(password)
  try {
    let user = await Architect.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    const token = 'generated-jwt-token'; 

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
});
router.get('/test', (req, res) => {
  res.json({ message: 'Hello World' });
});


router.put('/complete-profile', async (req, res) => {
  const { email, fullName, phone, country, city } = req.body;

  

  try {
    let user = await Architect.findOne({email});
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.fullName = fullName || user.fullName;
    user.phone = phone || user.phone;
    user.country = country || user.country;
    user.city = city || user.city;

    await user.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}); 
router.get('/find-user', async (req, res) => {
  const { email } = req.query; 

  try {
    const user = await Architect.findOne({ email });

    if (user) {
      res.status(200).json(user); 
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


module.exports = router;
