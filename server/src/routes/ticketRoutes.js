const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

// Get all tickets
router.get('/', ticketController.getTickets);

// Create a new ticket
router.post('/', ticketController.createTicket);

// Update ticket status (more specific route)
router.patch('/:id/status', ticketController.updateTicketStatus);

// Get a single ticket
router.get('/:id', ticketController.getTicket);

// Update a ticket
router.patch('/:id', ticketController.updateTicket);

// Delete a ticket
router.delete('/:id', ticketController.deleteTicket);

module.exports = router;