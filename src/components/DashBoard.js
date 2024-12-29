import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all events
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token');  // Assuming the token is saved in localStorage
        const response = await axios.get('http://localhost:5000/api/', {
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
      const token = localStorage.getItem('token');
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
    <div className="container my-5">
      <h2 className="my-4 text-center">Events Dashboard</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {events.length > 0 ? (
          events.map(event => (
            <div key={event._id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{event.name}</h5>
                  <p className="card-text">{event.description}</p>
                  <p><strong>Location:</strong> {event.location}</p>
                  <p><strong>Category:</strong> {event.category}</p>
                  <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleRSVP(event._id)}>
                    RSVP
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center w-100">No events available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
