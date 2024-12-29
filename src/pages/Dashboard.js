import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Failed to fetch events', error);
      }
    };

    fetchEvents();
  }, []);

  const handleRSVP = async (eventId) => {
    try {
      await axios.post(`http://localhost:5000/api/events/rsvp/${eventId}`);
      alert('RSVP successful!');
    } catch (error) {
      console.error('RSVP failed', error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div key={event._id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <p className="text-gray-600">{event.date}</p>
            <p className="text-gray-600">{event.category}</p>
            <button
              onClick={() => handleRSVP(event._id)}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
            >
              RSVP
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
