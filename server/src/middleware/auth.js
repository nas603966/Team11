// Simple middleware to check if the request is from an admin
// In a real application, this would use JWT or session-based authentication
const isAdmin = (req, res, next) => {
  // For this demo, we'll use a simple header to identify admin requests
  const adminKey = req.headers['x-admin-key'];
  
  if (adminKey === process.env.ADMIN_KEY || adminKey === 'admin123') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admin privileges required.' });
  }
};

module.exports = { isAdmin };