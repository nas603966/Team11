import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import TicketForm from './components/TicketForm';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import { ticketApi, adminApi } from './services/api';

function App() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated on initial render
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  // Load tickets from API on initial render
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const response = await ticketApi.getAllTickets();
        setTickets(response.data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching tickets:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const addTicket = async (newTicket) => {
    try {
      const response = await ticketApi.createTicket(newTicket);
      setTickets(prevTickets => [...prevTickets, response.data]);
      return response.data;
    } catch (err) {
      setError(err.message);
      console.error('Error creating ticket:', err);
      throw err;
    }
  };
  
  const updateTicketStatus = async (ticketId, newStatus) => {
    try {
      console.log('Updating ticket status:', { ticketId, newStatus });
      console.log('API URL:', import.meta.env.VITE_API_URL || 'http://localhost:5000/api');
      console.log('Token:', localStorage.getItem('token'));
      
      const response = await adminApi.updateTicketStatus(ticketId, newStatus);
      console.log('Response:', response);
      
      setTickets(prevTickets => 
        prevTickets.map(ticket => 
          ticket._id === ticketId ? response.data : ticket
        )
      );
      return response.data;
    } catch (err) {
      setError(err.message);
      console.error('Error updating ticket status:', err);
      console.error('Error details:', err.response?.data);
      throw err;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home tickets={tickets} />} />
            <Route 
              path="/submit-ticket" 
              element={<TicketForm addTicket={addTicket} />} 
            />
            <Route 
              path="/admin/login" 
              element={<AdminLogin setIsAuthenticated={setIsAuthenticated} />} 
            />
            <Route 
              path="/admin" 
              element={
                isAuthenticated ? (
                  <AdminDashboard 
                    tickets={tickets} 
                    updateTicketStatus={updateTicketStatus} 
                  />
                ) : (
                  <AdminLogin setIsAuthenticated={setIsAuthenticated} />
                )
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
