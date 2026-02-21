import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function Home() {
  return (
    <div className="hero-section">
      <h1>Welcome to OctoFit Tracker</h1>
      <p className="lead mb-4">
        Track activities, compete on leaderboards, and crush your fitness goals with your team.
      </p>
      <div className="container">
        <div className="row g-4 mt-3 justify-content-center">
          <div className="col-md-4 col-sm-6">
            <div className="card component-card bg-dark text-white h-100">
              <div className="card-body text-center">
                <h5 className="card-title">Activities</h5>
                <p className="card-text">Log and browse fitness activities.</p>
                <Link to="/activities" className="btn btn-outline-light btn-sm">View Activities</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="card component-card bg-dark text-white h-100">
              <div className="card-body text-center">
                <h5 className="card-title">Leaderboard</h5>
                <p className="card-text">See who's leading the pack.</p>
                <Link to="/leaderboard" className="btn btn-outline-light btn-sm">View Leaderboard</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="card component-card bg-dark text-white h-100">
              <div className="card-body text-center">
                <h5 className="card-title">Teams</h5>
                <p className="card-text">Manage and explore teams.</p>
                <Link to="/teams" className="btn btn-outline-light btn-sm">View Teams</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="card component-card bg-dark text-white h-100">
              <div className="card-body text-center">
                <h5 className="card-title">Users</h5>
                <p className="card-text">Browse registered users.</p>
                <Link to="/users" className="btn btn-outline-light btn-sm">View Users</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="card component-card bg-dark text-white h-100">
              <div className="card-body text-center">
                <h5 className="card-title">Workouts</h5>
                <p className="card-text">Discover workout suggestions.</p>
                <Link to="/workouts" className="btn btn-outline-light btn-sm">View Workouts</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container">
          <Link className="navbar-brand" to="/">OctoFit Tracker</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className={`nav-link${location.pathname === '/activities' ? ' active' : ''}`} to="/activities">Activities</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link${location.pathname === '/leaderboard' ? ' active' : ''}`} to="/leaderboard">Leaderboard</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link${location.pathname === '/teams' ? ' active' : ''}`} to="/teams">Teams</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link${location.pathname === '/users' ? ' active' : ''}`} to="/users">Users</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link${location.pathname === '/workouts' ? ' active' : ''}`} to="/workouts">Workouts</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/users" element={<Users />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>

      <footer className="app-footer">
        <div className="container">
          <span>&copy; {new Date().getFullYear()} OctoFit Tracker. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
