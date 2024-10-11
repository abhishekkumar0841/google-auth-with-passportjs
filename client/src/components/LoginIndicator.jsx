import React, { useState, useEffect } from 'react';

const LoginIndicator = () => {
  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'
  
  // Simulate a login process
  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus('success'); // Change to 'success' or 'error' after some time
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {status === 'loading' && (
        <div className="flex flex-col items-center">
          {/* Loading spinner */}
          <div className="w-16 h-16 border-4 border-t-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
          <p className="mt-4 text-lg text-gray-600">Logging in...</p>
        </div>
      )}

      {status === 'success' && (
        <div className="flex flex-col items-center">
          {/* Success animation */}
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 flex items-center justify-center text-green-500 animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <p className="mt-4 text-lg text-green-600">Login Successful!</p>
        </div>
      )}

      {status === 'error' && (
        <div className="flex flex-col items-center">
          {/* Error message */}
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 flex items-center justify-center text-red-500 animate-shake">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
          <p className="mt-4 text-lg text-red-600">Login Failed</p>
        </div>
      )}
    </div>
  );
};

export default LoginIndicator;
