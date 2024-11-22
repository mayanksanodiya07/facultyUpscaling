import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerificationPage = () => {
  const { id, secretString } = useParams(); // Extract ID and unique string from URL
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('loading'); // Track loading, success, or failure status
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/faculty/verify/${id}/${secretString}`
        );
        setMessage(response.data.message);
        setStatus('success');
      } catch (error) {
        if (error.response) {
          setMessage(error.response.data.message);
        } else {
          setMessage('An error occurred during verification.');
        }
        setStatus('error');
      }
    };

    verifyEmail();
  }, [id, secretString]);

  const handleRedirect = () => {
    navigate('/faculty/login'); // Redirect to the login page
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-md p-8 max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
        {status === 'loading' ? (
          <p className="text-gray-600">Verifying your email...</p>
        ) : (
          <>
            <p className="text-gray-700">{message}</p>
            {status === 'success' && (
              <button
                onClick={handleRedirect}
                className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              >
                Go to Login
              </button>
            )}
          </>
        )}
        {status === 'error' && (
          <button
            onClick={() => navigate('/faculty/Login')}
            className="mt-6 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
          >
            Go to Login
          </button>
        )}
      </div>
    </div>
  );
};

export default VerificationPage;
