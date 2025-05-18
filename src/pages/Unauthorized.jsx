import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">403 - Access Denied</h1>
        <p className="text-lg text-gray-700 mb-6">
          You don't have permission to access this page.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Go to Home
          </Link>
          <Link
            to="/profile"
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Unauthorized;
