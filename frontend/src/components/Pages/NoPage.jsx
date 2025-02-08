import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import axios from 'axios';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/user")
      .then(response => setUser(response.data[0])) 
      .catch(error => console.error('Error fetching user data: ', error));
  }, []);

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="text-center">
        <ExclamationCircleIcon className="w-24 h-24 text-gray-400 mx-auto mb-6" />
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <p className="text-2xl text-gray-600 mt-4">Oops! Page not found.</p>
        <p className="text-lg text-gray-500 mt-2">
          The page you're looking for doesn't exist or has been moved. Go back to{' '}
          {user ? <a href="/">{user.user}</a> : 'loading...'}
        </p>
        <button
          onClick={handleGoHome}
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
