import React, { useState, useEffect } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchActivities = () => {
    setLoading(true);
    console.log('Fetching activities from:', API_URL);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log('Activities data received:', data);
        const items = Array.isArray(data) ? data : data.results || [];
        setActivities(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching activities:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div className="container mt-4">
      <div className="card component-card">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Activities</h4>
          <button className="btn btn-outline-light btn-sm" onClick={fetchActivities}>Refresh</button>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : activities.length === 0 ? (
            <div className="empty-state">
              <p className="text-muted">No activities found.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-striped align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>User</th>
                    <th>Team</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity, index) => (
                    <tr key={activity.id || index}>
                      <td><span className="badge bg-secondary badge-rank">{index + 1}</span></td>
                      <td>{activity.name}</td>
                      <td>{activity.user}</td>
                      <td><span className="badge bg-info text-dark">{activity.team}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="card-footer text-muted">
          Total: {activities.length} activities
        </div>
      </div>
    </div>
  );
}

export default Activities;
