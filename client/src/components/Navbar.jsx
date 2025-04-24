import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-xl font-bold">
            FixItNow Helpdesk
          </Link>
          
          <div className="flex space-x-4">
            <Link to="/" className="hover:text-blue-200">
              Home
            </Link>
            <Link to="/submit-ticket" className="hover:text-blue-200">
              Submit Ticket
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/admin" className="hover:text-blue-200">
                  Admin Dashboard
                </Link>
                <button 
                  onClick={onLogout}
                  className="hover:text-blue-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/admin/login" className="hover:text-blue-200">
                Admin Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 