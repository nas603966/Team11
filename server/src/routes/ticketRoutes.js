const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

// Get all tickets
router.get('/', ticketController.getTickets);

// Get a single ticket
router.get('/:id', ticketController.getTicket);

// Create a new ticket
router.post('/', ticketController.createTicket);

// Update a ticket
router.patch('/:id', ticketController.updateTicket);

// Delete a ticket
router.delete('/:id', ticketController.deleteTicket);

module.exports = router;