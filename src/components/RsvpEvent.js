// src/components/RsvpEvent.js
import React from 'react';
import axios from 'axios';

const RsvpEvent = ({ eventId }) => {
  const handleRsvp = () => {
    axios.post(`http://localhost:5000/api/events/rsvp/${eventId}`, {}, {
      headers: {
        'x-auth-token': 'your-jwt-token-here',
      },
    })
      .then(response => {
        console.log('RSVP Successful:', response.data);
      })
      .catch(error => {
        console.error('Error RSVPing:', error);
      });
  };

  return <button onClick={handleRsvp}>RSVP</button>;
};

export default RsvpEvent;
