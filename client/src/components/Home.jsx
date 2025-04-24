import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Welcome to the FixItNow Helpdesk
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Submit your technical issues and get them resolved quickly!
      </p>
      <div className="flex justify-center space-x-4">
        <Link
          to="/submit-ticket"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
        >
          Submit a Ticket
        </Link>
        <Link
          to="/admin"
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
        >
          Admin Dashboard
        </Link>
      </div>
    </div>
  );
}

export default Home; 