import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const [timer, setTimer] = useState(5); // 3 seconds countdown
  const navigate = useNavigate();

  useEffect(() => {
    if (timer === 0) {
      navigate('/'); // Redirect to home after the timer hits 0
    } else {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(countdown); // Cleanup interval on component unmount
    }
  }, [timer, navigate]);

  return (
    <div className="h-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://via.placeholder.com/1500)' }}>
      <div className="flex flex-col items-center justify-center h-full bg-black bg-opacity-50">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center leading-tight mb-6">
          <span className="text-indigo-500">Oops!</span>
          <br />
          <span className="text-4xl sm:text-5xl md:text-6xl text-white">Page Not Found</span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-white mb-8 text-center px-4 md:px-8">
          It looks like the page you're looking for doesn't exist.
          <br />
          Don't worry, you will be redirected to the home page in {timer} seconds.
        </p>

        <div className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg text-lg">
          <span>Redirecting in {timer}...</span>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
