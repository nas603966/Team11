import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-gray-800">
            FixItNow Helpdesk
          </Link>
          <div className="flex space-x-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md"
            >
              Home
            </Link>
            <Link
              to="/submit-ticket"
              className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md"
            >
              Submit Ticket
            </Link>
            <Link
              to="/admin"
              className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 