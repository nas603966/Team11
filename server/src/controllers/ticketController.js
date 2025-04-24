const Ticket = require('../models/Ticket');
const mongoose = require('mongoose');

// In-memory storage for development if MongoDB is not available
let inMemoryTickets = [];
let nextId = 1;

// Check if MongoDB is connected
const isMongoConnected = () => {
  return mongoose.connection.readyState === 1;
};

// Get all tickets
exports.getTickets = async (req, res) => {
  try {
    if (isMongoConnected()) {
      const tickets = await Ticket.find().sort({ createdAt: -1 });
      res.status(200).json(tickets);
    } else {
      // Use in-memory storage
      res.status(200).json(inMemoryTickets);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tickets', error: error.message });
  }
};

// Get a single ticket
exports.getTicket = async (req, res) => {
  try {
    if (isMongoConnected()) {
      const ticket = await Ticket.findById(req.params.id);
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
      res.status(200).json(ticket);
    } else {
      // Use in-memory storage
      const ticket = inMemoryTickets.find(t => t._id === req.params.id);
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
      res.status(200).json(ticket);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ticket', error: error.message });
  }
};

// Create a new ticket
exports.createTicket = async (req, res) => {
  try {
    const { name, title, description, urgency } = req.body;
    
    if (isMongoConnected()) {
      const ticket = new Ticket({
        name,
        title,
        description,
        urgency
      });
      
      await ticket.save();
      res.status(201).json(ticket);
    } else {
      // Use in-memory storage
      const ticket = {
        _id: String(nextId++),
        name,
        title,
        description,
        urgency,
        status: 'open',
        createdAt: new Date()
      };
      
      inMemoryTickets.push(ticket);
      res.status(201).json(ticket);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating ticket', error: error.message });
  }
};

// Update a ticket
exports.updateTicket = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (isMongoConnected()) {
      const ticket = await Ticket.findById(req.params.id);
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
      
      ticket.status = status;
      await ticket.save();
      
      res.status(200).json(ticket);
    } else {
      // Use in-memory storage
      const ticketIndex = inMemoryTickets.findIndex(t => t._id === req.params.id);
      if (ticketIndex === -1) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
      
      inMemoryTickets[ticketIndex].status = status;
      res.status(200).json(inMemoryTickets[ticketIndex]);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating ticket', error: error.message });
  }
};

// Delete a ticket
exports.deleteTicket = async (req, res) => {
  try {
    if (isMongoConnected()) {
      const ticket = await Ticket.findByIdAndDelete(req.params.id);
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
      res.status(200).json({ message: 'Ticket deleted successfully' });
    } else {
      // Use in-memory storage
      const ticketIndex = inMemoryTickets.findIndex(t => t._id === req.params.id);
      if (ticketIndex === -1) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
      
      inMemoryTickets.splice(ticketIndex, 1);
      res.status(200).json({ message: 'Ticket deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting ticket', error: error.message });
  }
};