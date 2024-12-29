import React from 'react';
import Dashboard from './DashBoard';
const Home = () => {
  return (<>
    <div className="home-page">
    <header className="home-header">
      <h1>Welcome to the Event Dashboard</h1>
      <p>Your place to manage and RSVP for events</p>
    </header>
    <main>
      <Dashboard /> {/* Embed the Dashboard component */}
    </main>
  </div>
    <div className="container text-center mt-5">
      <div className="card shadow-lg p-5">
        <h1 className="display-4 mb-4">Welcome to the Authentication App!</h1>
        <p className="lead">You are successfully logged in.</p>
        <p className="text-muted">This is your home page where you can access all features.</p>
      </div>
    </div>
    </>);
};

export default Home;
