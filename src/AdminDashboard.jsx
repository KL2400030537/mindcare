import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './AdminDashboard.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserMoods, setSelectedUserMoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'admin') {
      navigate('/');
      return;
    }

    
    fetchAllUsers();
  }, [navigate]);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching users:', err);
      setUsers([]);
      setLoading(false);
    }
  };

  const fetchUserMoods = async (userId) => {
    try {
      const response =await axios.get(`http://localhost:5000/api/moods/${userId}`);

      setSelectedUserMoods(response.data);
    } catch (err) {
      console.error('Error fetching moods:', err);
      setSelectedUserMoods([]);
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    fetchUserMoods(user.userId);
  };

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  if (loading) {
    return <div className="admin-loading">Loading Admin Dashboard...</div>;
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="header-content">
          <h1>👨‍💼 Admin Dashboard</h1>
          <p>Welcome, Admin</p>
        </div>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </header>

      <div className="admin-container">
        <div className="users-panel">
          <h2>All Users</h2>
          <div className="users-list">
            {users.length > 0 ? (
              users.map(user => (
                <div
                  key={user.userId}
                  className={`user-card ${selectedUser?.userId === user.userId ? 'selected' : ''}`}
                  onClick={() => handleUserSelect(user)}
                >
                  <img src={`https://i.pravatar.cc/100?u=${user.email}`} alt={user.firstName} />
                  <div>
                    <p className="user-name">{user.firstName} {user.lastName}</p>
                    <p className="user-email">{user.email}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-users">No users found</p>
            )}
          </div>
        </div>

        <div className="data-panel">
          {selectedUser ? (
            <>
              <h2>{selectedUser.firstName} {selectedUser.lastName}'s Mood Data</h2>
              <div className="user-info">
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Phone:</strong> {selectedUser.phone}</p>
                <p><strong>Mood Entries:</strong> {selectedUserMoods.length}</p>
              </div>

              {selectedUserMoods.length > 0 ? (
                <>
                  <div className="chart-container">
                    <h3>Mood Tracking Graph</h3>
                    <div style={{ position: 'relative', height: '300px', marginBottom: '20px' }}>
                      <Line
                        data={{
                          labels: selectedUserMoods.map(entry => new Date(entry.date).toLocaleDateString()),
                          datasets: [{
                            label: 'Mood over Time',
                            data: selectedUserMoods.map(entry => {
                              switch(entry.mood){
                                case 'Happy': return 5;
                                case 'Excited': return 4;
                                case 'Neutral': return 3;
                                case 'Anxious': return 2;
                                case 'Sad': return 1;
                                default: return 0;
                              }
                            }),
                            borderColor: 'rgba(75,192,192,1)',
                            backgroundColor: 'rgba(75,192,192,0.1)',
                            tension: 0.3,
                            fill: true
                          }]
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: { display: true }
                          },
                          scales: {
                            y: {
                              beginAtZero: true,
                              max: 5,
                              ticks: {
                                callback: function(value) {
                                  const moods = ['', 'Sad', 'Anxious', 'Neutral', 'Excited', 'Happy'];
                                  return moods[value];
                                }
                              }
                            }
                          }
                        }}
                      />
                    </div>
                  </div>

                  <div className="mood-history">
                    <h3>Mood History</h3>
                    <ul>
                      {selectedUserMoods.map((entry, index) => (
                        <li key={index}>
                          <strong>{new Date(entry.date).toLocaleDateString()}:</strong> {entry.mood}
                          {entry.note && ` - ${entry.note}`}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <p className="no-data">No mood data for this user</p>
              )}
            </>
          ) : (
            <div className="no-selection">
              <p>Select a user to view their mood data</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;