import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all events
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('authToken');  // Assuming the token is saved in localStorage
        const response = await axios.get('http://localhost:5000/api/events', {
          headers: { 'x-auth-token': token }
        });
        setEvents(response.data);
      } catch (err) {
        setError('Error fetching events');
        console.error(err);
      }
    };

    fetchEvents();
  }, []);

  const handleRSVP = async (eventId) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.post(`http://localhost:5000/api/events/rsvp/${eventId}`, {}, {
        headers: { 'x-auth-token': token }
      });
      alert('RSVP Successful!');
    } catch (err) {
      alert('Failed to RSVP');
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Events Dashboard</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="list-group">
        {events.map(event => (
          <div key={event._id} className="list-group-item">
            <h4>{event.name}</h4>
            <p>{event.description}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Category:</strong> {event.category}</p>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <button 
              className="btn btn-primary"
              onClick={() => handleRSVP(event._id)}>
              RSVP
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
