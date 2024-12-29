import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook
import { FaSignInAlt, FaSignOutAlt, FaHome, FaUserPlus } from 'react-icons/fa'; // Icons for buttons

const Navbar = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    alert('Logged out successfully!');
    navigate('/login'); // Redirect to login page after logout
  };

  // Check if the user is logged in by checking the token in localStorage
  const isLoggedIn = localStorage.getItem('token');

  const handleHomeRedirect = () => {
    navigate('/home'); // Redirect to the home page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-lg">
      <div className="container-fluid">
        <a className="navbar-brand text-white fs-3" href="/">Event Planner</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link text-white" href="/register">
                <FaUserPlus className="me-2" /> Register
              </a>
            </li>
            {!isLoggedIn ? (
              <li className="nav-item">
                <a className="nav-link text-white" href="/login">
                  <FaSignInAlt className="me-2" /> Login
                </a>
              </li>
            ) : (
              <li className="nav-item">
                <button className="btn btn-light" onClick={handleHomeRedirect}>
                  <FaHome className="me-2" /> Home
                </button>
              </li>
            )}
            {isLoggedIn && (
              <li className="nav-item">
                <button className="btn btn-danger" onClick={handleLogout}>
                  <FaSignOutAlt className="me-2" /> Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
