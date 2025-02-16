import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddTask from './pages/user/AddTask';
import ViewTasks from './pages/user/ViewTasks';
import Home from './pages/Home';
import { AuthContext } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import { ToastContainer } from 'react-toastify';
import NotFound from './pages/NotFound';
import VoteTask from './pages/worker/VoteTask';

const App = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    const address = localStorage.getItem("address");
    if (token) {
      setIsUserAuthenticated({ address, token });
    }
  }, []);

  return (
    <>
      <Router>
        <AuthContext.Provider value={{ isUserAuthenticated, setIsUserAuthenticated }}>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            {/* Protected routes */}
            <Route element={<ProtectedRoute element={<AddTask />} />} path="/user/add-task" />
            <Route element={<ProtectedRoute element={<ViewTasks />} />} path="/user/view-tasks" />


            <Route element={<ProtectedRoute element={<VoteTask />} />} path="/worker/vote" />

            
            <Route element={<NotFound />} path="*" />
          </Routes>


          <ToastContainer />
        </AuthContext.Provider>
      </Router>
    </>
  );
};

export default App;
