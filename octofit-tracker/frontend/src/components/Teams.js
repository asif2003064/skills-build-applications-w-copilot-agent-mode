import React, { useState, useEffect } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTeams = () => {
    setLoading(true);
    console.log('Fetching teams from:', API_URL);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log('Teams data received:', data);
        const items = Array.isArray(data) ? data : data.results || [];
        setTeams(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching teams:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <div className="container mt-4">
      <div className="card component-card">
        <div className="card-header bg-warning text-dark d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Teams</h4>
          <button className="btn btn-outline-dark btn-sm" onClick={fetchTeams}>Refresh</button>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : teams.length === 0 ? (
            <div className="empty-state">
              <p className="text-muted">No teams found.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-striped align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Team Name</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team, index) => (
                    <tr key={team.id || index}>
                      <td><span className="badge bg-secondary badge-rank">{index + 1}</span></td>
                      <td><strong>{team.name}</strong></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="card-footer text-muted">
          Total: {teams.length} teams
        </div>
      </div>
    </div>
  );
}

export default Teams;
