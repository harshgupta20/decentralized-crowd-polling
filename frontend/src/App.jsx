import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddTask from './pages/user/AddTask';
import ViewTasks from './pages/user/ViewTasks';
import Home from './pages/Home';
import { AuthContext } from './context/AuthContext';

import { ToastContainer } from 'react-toastify';
import FormComponent from './pages/Form';

const App = () => {

  const [isUserAuthenticated, setIsUserAuthenticated] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    const address = localStorage.getItem("address");
    if(token){
      setIsUserAuthenticated({address,token});
    }
  }, [])

  return (
    <>
      <Router>
        <AuthContext.Provider value={{isUserAuthenticated, setIsUserAuthenticated}}>
          <Navbar />
          <Routes>
            <Route element={<Home />} path='/' />
            <Route element={<AddTask />} path='/user/add-task' />
            <Route element={<ViewTasks />} path='/user/view-tasks' />
          </Routes>

          <ToastContainer />
        </AuthContext.Provider>
        <FormComponent/>
      </Router>
      {/* <Form /> */}
    </>
  )
}

export default App