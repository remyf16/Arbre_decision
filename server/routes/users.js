const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Get all users (admin only)
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a user (admin only)
router.patch('/:id', auth, async (req, res) => {
    try {
        const adminUser = await User.findById(req.user.id);
        if (adminUser.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (req.body.email) user.email = req.body.email;
        if (req.body.role) user.role = req.body.role;

        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Delete a user (admin only)
router.delete('/:id', auth, async (req, res) => {
    try {
        const adminUser = await User.findById(req.user.id);
        if (adminUser.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.remove();
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
