import React, { useState, useEffect } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaderboard = () => {
    setLoading(true);
    console.log('Fetching leaderboard from:', API_URL);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log('Leaderboard data received:', data);
        const items = Array.isArray(data) ? data : data.results || [];
        setLeaderboard(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching leaderboard:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const getRankBadge = (index) => {
    if (index === 0) return 'bg-warning text-dark';
    if (index === 1) return 'bg-secondary';
    if (index === 2) return 'bg-danger';
    return 'bg-dark';
  };

  return (
    <div className="container mt-4">
      <div className="card component-card">
        <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Leaderboard</h4>
          <button className="btn btn-outline-light btn-sm" onClick={fetchLeaderboard}>Refresh</button>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="empty-state">
              <p className="text-muted">No leaderboard entries found.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-striped align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Rank</th>
                    <th>Team</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, index) => (
                    <tr key={entry.id || index}>
                      <td><span className={`badge badge-rank ${getRankBadge(index)}`}>{index + 1}</span></td>
                      <td><strong>{entry.team}</strong></td>
                      <td><span className="badge bg-success">{entry.points} pts</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="card-footer text-muted">
          Total: {leaderboard.length} teams ranked
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
