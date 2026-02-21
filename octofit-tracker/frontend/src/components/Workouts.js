import React, { useState, useEffect } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWorkouts = () => {
    setLoading(true);
    console.log('Fetching workouts from:', API_URL);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log('Workouts data received:', data);
        const items = Array.isArray(data) ? data : data.results || [];
        setWorkouts(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching workouts:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <div className="container mt-4">
      <div className="card component-card">
        <div className="card-header bg-danger text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Workouts</h4>
          <button className="btn btn-outline-light btn-sm" onClick={fetchWorkouts}>Refresh</button>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : workouts.length === 0 ? (
            <div className="empty-state">
              <p className="text-muted">No workouts found.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-striped align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {workouts.map((workout, index) => (
                    <tr key={workout.id || index}>
                      <td><span className="badge bg-secondary badge-rank">{index + 1}</span></td>
                      <td><strong>{workout.name}</strong></td>
                      <td>{workout.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="card-footer text-muted">
          Total: {workouts.length} workouts
        </div>
      </div>
    </div>
  );
}

export default Workouts;
