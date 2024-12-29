import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false); // To track if login is successful
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', formData);
      localStorage.setItem('token', res.data.token); // Storing token in localStorage
      alert('Login successful!');
      setIsLoggedIn(true); // Set logged in state to true after successful login
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || 'Login failed');
    }
  };

  const handleRedirect = () => {
    navigate('/home'); // Redirect to home page when button is clicked
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4 w-50">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>
        </form>

        {/* Show the redirect button after successful login */}
        {isLoggedIn && (
          <button onClick={handleRedirect} className="btn btn-success w-100">
            Go to Home
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
