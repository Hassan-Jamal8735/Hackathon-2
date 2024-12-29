// src/components/CreateEvent.js
import React, { useState } from 'react';
import axios from 'axios';

const CreateEvent = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const eventData = {
      name,
      description,
      location,
      category,
      date,
    };

    axios.post('http://localhost:5000/api/events', eventData, {
      headers: {
        'x-auth-token': 'your-jwt-token-here',
      },
    })
      .then(response => {
        console.log('Event created:', response.data);
        // Redirect or clear form
      })
      .catch(error => {
        console.error('Error creating event:', error);
      });
  };

  return (
    <div>
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Event Name"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          required
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          required
        />
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
