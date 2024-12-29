import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SummaryCounts = () => {
  const [counts, setCounts] = useState({
    users: 0,
    events: 0,
    rsvps: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch counts for users, events, and RSVPs
        const [usersResponse, eventsResponse, rsvpsResponse] = await Promise.all([
          axios.get('/api/users/count'), // Endpoint for user count
          axios.get('/api/events/count'), // Endpoint for event count
          axios.get('/api/rsvps/count'), // Endpoint for RSVP count
        ]);

        setCounts({
          users: usersResponse.data.count || 0,
          events: eventsResponse.data.count || 0,
          rsvps: rsvpsResponse.data.count || 0,
        });
      } catch (err) {
        setError('Failed to fetch counts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', textAlign: 'center' }}>
      <h2>Application Summary</h2>
      <div style={{ fontSize: '18px', margin: '10px 0' }}>Total Users: <strong>{counts.users}</strong></div>
      <div style={{ fontSize: '18px', margin: '10px 0' }}>Total Events: <strong>{counts.events}</strong></div>
      <div style={{ fontSize: '18px', margin: '10px 0' }}>Total RSVPs: <strong>{counts.rsvps}</strong></div>
    </div>
  );
};

export default SummaryCounts;
