import React from 'react';
import Dashboard from './DashBoard';
import CreateEvent from './CreateEvent'; // Import the CreateEvent component
import DashboardCounts from './DashboardCounts'; // Import the DashboardCounts component
import { FaCalendarAlt } from 'react-icons/fa'; // Event icon for better UI

const Home = () => {
  return (
    <>
      <div className="home-page">
        <header className="home-header text-white py-5" style={{ backgroundColor: "#ffffff" }}>
          <div className="container text-center">
            <h1 className="display-4 text-dark">Welcome to the Event Planner</h1>
            {/* <p className="lead">Manage your events and RSVP seamlessly</p> */}
          </div>
        </header>

        <main className="py-5">
          <div className="container">
            <div className="col">
              {/* Dashboard Counts Section */}
              <div className="col mb-4">
                <div className="card shadow-lg">
                  <div className="card-header bg-primary text-white">
                    <h4>Platform Overview</h4>
                  </div>
                  <div className="card-body">
                    {/* Embed DashboardCounts component */}
                    <DashboardCounts />
                  </div>
                </div>
              </div>

              {/* Create Event Form Section */}
              <div className="col mb-4">
                <div className="card shadow-lg">
                  <div className="card-header bg-secondary text-white">
                    <h4>
                      <FaCalendarAlt className="me-2" />
                      Create New Event
                    </h4>
                  </div>
                  <div className="card-body">
                    {/* Embed CreateEvent component */}
                    <CreateEvent />
                  </div>
                </div>
              </div>

              {/* Dashboard Section */}
              <div className="col mb-4">
                <div className="card shadow-lg">
                  <div className="card-header bg-info text-white">
                    <h4>Event Dashboard</h4>
                  </div>
                  <div className="card-body">
                    {/* Embed Dashboard component */}
                    <Dashboard />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
