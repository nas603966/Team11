import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage if it exists
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors (token expired or invalid)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

// Ticket APIs
export const ticketApi = {
  // Get all tickets
  getAllTickets: () => api.get('/tickets'),
  
  // Get a single ticket
  getTicket: (id) => api.get(`/tickets/${id}`),
  
  // Create a new ticket
  createTicket: (ticketData) => api.post('/tickets', ticketData),
  
  // Update a ticket
  updateTicket: (id, ticketData) => api.put(`/tickets/${id}`, ticketData),
  
  // Delete a ticket
  deleteTicket: (id) => api.delete(`/tickets/${id}`),
  
  // Update ticket status
  updateTicketStatus: (id, status) => api.patch(`/tickets/${id}/status`, { status }),
};

// Admin APIs
export const adminApi = {
  // Login as admin
  login: (credentials) => api.post('/admin/login', credentials),
  
  // Get all tickets (admin route)
  getAllTickets: () => api.get('/admin/tickets'),
  
  // Update ticket status (admin route)
  updateTicketStatus: (id, status) => {
    console.log('Admin API - updateTicketStatus:', { id, status });
    console.log('Request URL:', `${API_URL}/admin/tickets/${id}/status`);
    return api.patch(`/admin/tickets/${id}/status`, { status });
  },
};

export default api; 