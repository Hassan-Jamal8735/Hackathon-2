import React, { useState } from 'react';
import axios from 'axios';

const CreateEvent = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const eventData = {
      name,
      description,
      location,
      category,
      date,
    };

    // Get the token from localStorage
    const token = localStorage.getItem('token');
    
    if (!token) {
      setError('No token found, please login');
      return;
    }
    console.log(eventData)
    axios.post('http://localhost:5000/api/events', eventData, {
      headers: {
        'x-auth-token': token,  // Include token in the request header
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        setSuccess('Event created successfully!');
        console.log('Event created:', response.data);
        // Optionally, redirect the user to another page or reset form
      })
      .catch(error => {
        setError('Error creating event');
        console.error('Error creating event:', error);
      });
  };

  return (
    <div className="container mt-5">
      <h2>Create New Event</h2>

      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Event Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Event Name"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input
            type="text"
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location</label>
          <input
            type="text"
            id="location"
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <input
            type="text"
            id="category"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Event Date</label>
          <input
            type="datetime-local"
            id="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
