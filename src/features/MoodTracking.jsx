import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './MoodTracking.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MoodTracking = () => {
  const userId = "USER_ID"; // <--- Replace with real user ID from auth
  const [mood, setMood] = useState('');
  const [note, setNote] = useState('');
  const [moodEntries, setMoodEntries] = useState([]);
  const [savedMessage, setSavedMessage] = useState('');

  // Fetch moods from backend
  const fetchMoods = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/moods/${userId}`);
      setMoodEntries(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMoods();
  }, []);

  const handleMoodSubmit = async () => {
    if (!mood) return;
    try {
      const res = await axios.post('http://localhost:5000/api/moods', { userId, mood, note });
      setMoodEntries([...moodEntries, res.data]);
      setSavedMessage('Mood saved successfully!');
      setMood('');
      setNote('');
      setTimeout(() => setSavedMessage(''), 3000);
    } catch (err) {
      console.log(err);
    }
  };

  // Prepare chart data
  const moodData = {
    labels: moodEntries.map(entry => new Date(entry.date).toLocaleDateString()),
    datasets: [{
      label: 'Mood over Time',
      data: moodEntries.map(entry => {
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
      tension: 0.3
    }]
  };

  return (
    <div className="mood-tracking-container">
      <h2>Mood Tracking</h2>
      <p>Track your current mood and reflect on your emotional state.</p>

      <div className="mood-selector">
        <label htmlFor="mood">Select your mood:</label>
        <select id="mood" value={mood} onChange={(e) => setMood(e.target.value)}>
          <option value="">-- Select Mood --</option>
          <option value="Happy">😊 Happy</option>
          <option value="Sad">😢 Sad</option>
          <option value="Neutral">😐 Neutral</option>
          <option value="Anxious">😟 Anxious</option>
          <option value="Excited">😃 Excited</option>
        </select>

        <label htmlFor="note">Add a note (optional):</label>
        <textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Why do you feel this way?"
        ></textarea>

        <button onClick={handleMoodSubmit}>Save Mood</button>
        {savedMessage && <p className="saved-message">{savedMessage}</p>}
      </div>

      <div className="mood-history">
        <h3>Your Mood History</h3>
        <ul>
          {moodEntries.map((entry, index) => (
            <li key={index}>
              <strong>{new Date(entry.date).toLocaleDateString()}:</strong> {entry.mood} {entry.note && `- ${entry.note}`}
            </li>
          ))}
        </ul>
      </div>

      <div className="mood-chart">
        <h3>Mood Trend</h3>
        <Line data={moodData} />
      </div>
    </div>
  );
};

export default MoodTracking;
