import React from 'react';
import Form from './pages/Form';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddTask from './pages/user/AddTask';
import ViewTasks from './pages/user/ViewTasks';
import Home from './pages/Home';

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route element={<Home />} path='/' />
          <Route element={<AddTask />} path='/user/add-task' />
          <Route element={<ViewTasks />} path='/user/view-tasks' />
        </Routes>
      </Router>
      {/* <Form /> */}
    </>
  )
}

export default App