const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Admin login route (public)
router.post('/login', adminController.login);

// Protected admin routes
router.get('/profile', verifyToken, isAdmin, adminController.getProfile);

// Admin ticket routes
router.patch('/tickets/:id/status', verifyToken, isAdmin, adminController.updateTicketStatus);

module.exports = router; 