const { ticketService } = require('../services/dataService');

// Get all tickets
const getTickets = async (req, res) => {
  try {
    const tickets = await ticketService.getAll();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tickets', error: error.message });
  }
};

// Get a single ticket
const getTicket = async (req, res) => {
  try {
    const ticket = await ticketService.getById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ticket', error: error.message });
  }
};

// Create a new ticket
const createTicket = async (req, res) => {
  try {
    const { name, title, description, urgency } = req.body;
    const ticket = await ticketService.create({
      name,
      title,
      description,
      urgency,
      status: 'open'
    });
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Error creating ticket', error: error.message });
  }
};

// Update a ticket
const updateTicket = async (req, res) => {
  try {
    const { status } = req.body;
    const ticket = await ticketService.update(req.params.id, { status });
    
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Error updating ticket', error: error.message });
  }
};

// Update ticket status
const updateTicketStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    const ticket = await ticketService.update(id, { status });
    
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    
    return res.json(ticket);
  } catch (error) {
    console.error('Error updating ticket status:', error);
    res.status(500).json({ message: 'Error updating ticket status' });
  }
};

// Delete a ticket
const deleteTicket = async (req, res) => {
  try {
    const success = await ticketService.delete(req.params.id);
    if (!success) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting ticket', error: error.message });
  }
};

module.exports = {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  updateTicketStatus,
  deleteTicket
};