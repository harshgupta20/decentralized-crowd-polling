import React from 'react';

const Home = () => {
  return (
    <div className="h-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://via.placeholder.com/1500)' }}>
      <div className="flex flex-col items-center justify-center h-full bg-black bg-opacity-50">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center leading-tight mb-6">
          <span className="text-indigo-500">Let the World</span> 
          <br />
          <span className="text-4xl sm:text-5xl md:text-6xl text-white">Decide the Best</span>
          <br />
          <span className="text-indigo-500">Thumbnail for Your Videos.</span>
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl text-white mb-8 text-center px-4 md:px-8">
          <span className="font-semibold">Share your video thumbnails</span> and let others vote on the best one. 
          <br />
          <span className="italic">Make your content stand out!</span>
        </p>
        
        <a
          href="#get-started"
          className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

export default Home;
