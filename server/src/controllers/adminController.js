const jwt = require('jsonwebtoken');
const { adminService, ticketService } = require('../services/dataService');

// Admin login
exports.login = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const admin = await adminService.validateCredentials(username, password);
    
    if (admin) {
      // Create JWT payload
      const payload = {
        id: admin.id,
        username: admin.username,
        isAdmin: true
      };
      
      // Sign token
      jwt.sign(
        payload,
        process.env.JWT_SECRET || 'your_jwt_secret_key_here',
        { expiresIn: '1h' },
        (err, token) => {
          if (err) {
            return res.status(500).json({ message: 'Error creating token', error: err.message });
          }
          
          res.json({
            success: true,
            token,
            user: {
              id: payload.id,
              username: payload.username,
              isAdmin: payload.isAdmin
            }
          });
        }
      );
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error during login', error: error.message });
  }
};

// Get admin profile
exports.getProfile = (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    isAdmin: req.user.isAdmin
  });
};

// Update ticket status
exports.updateTicketStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['open', 'in_progress', 'resolved', 'closed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    // Update ticket status
    const updatedTicket = await ticketService.update(id, { status });

    if (!updatedTicket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.json(updatedTicket);
  } catch (error) {
    console.error('Error updating ticket status:', error);
    res.status(500).json({ message: 'Error updating ticket status', error: error.message });
  }
}; 