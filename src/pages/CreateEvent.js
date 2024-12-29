import React, { useState } from 'react';
import axios from 'axios';

const CreateEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [visibility, setVisibility] = useState('public');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/events', {
        title,
        description,
        date,
        location,
        category,
        visibility,
      });
      alert('Event created!');
    } catch (error) {
      console.error('Error creating event', error);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Create Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 mb-4 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 mb-4 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="date"
          className="w-full p-2 mb-4 border rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location"
          className="w-full p-2 mb-4 border rounded"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category"
          className="w-full p-2 mb-4 border rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <select
          className="w-full p-2 mb-4 border rounded"
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
