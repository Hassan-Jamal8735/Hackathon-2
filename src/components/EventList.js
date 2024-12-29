// src/components/EventList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all events
  useEffect(() => {
    axios.get('http://localhost:5000/api/events')
      .then(response => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Events</h2>
      {loading ? <p>Loading...</p> : (
        <ul>
          {events.map(event => (
            <li key={event._id}>
              <h3>{event.name}</h3>
              <p>{event.description}</p>
              <p>{event.location}</p>
              <p>{event.date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList;
