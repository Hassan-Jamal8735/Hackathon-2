import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Home from './components/Home'; // Import Home component

// import EventList from './components/EventList';
// import CreateEvent from './components/CreateEvent';
// import RsvpEvent from './components/RsvpEvent';
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};
 
export default App;
