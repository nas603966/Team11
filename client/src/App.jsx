import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import TicketForm from './components/TicketForm';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [tickets, setTickets] = useState([]);

  // Load tickets from localStorage on initial render
  useEffect(() => {
    const storedTickets = localStorage.getItem('tickets');
    if (storedTickets) {
      setTickets(JSON.parse(storedTickets));
    }
  }, []);

  // Save tickets to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tickets', JSON.stringify(tickets));
  }, [tickets]);

  const addTicket = (newTicket) => {
    const ticketWithId = {
      ...newTicket,
      _id: Date.now().toString(), // Using _id to match backend structure
      createdAt: new Date().toISOString()
    };
    setTickets(prevTickets => [...prevTickets, ticketWithId]);
  };
  
  const updateTicketStatus = (ticketId, newStatus) => {
    setTickets(prevTickets => 
      prevTickets.map(ticket => 
        ticket._id === ticketId ? { ...ticket, status: newStatus } : ticket
      )
    );
  };

  return (
  <Router>
  <div className="min-h-screen bg-gray-100">
    <Navbar />
    <div className="container mx-auto px-4 py-8">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/submit-ticket" 
          element={<TicketForm addTicket={addTicket} />} 
        />
        <Route 
          path="/admin" 
          element={
            <AdminDashboard 
              tickets={tickets} 
              updateTicketStatus={updateTicketStatus} 
            />
          } 
        />
      </Routes>
    </div>
    </div>

  </Router>
  );
}

export default App;
