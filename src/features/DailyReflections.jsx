import React, { useState, useEffect } from 'react';
import './DailyReflections.css';
const DailyReflections = () => {
  const [reflection, setReflection] = useState('');

  useEffect(() => {
    const savedReflection = localStorage.getItem('reflection');
    if (savedReflection) {
      setReflection(savedReflection);
    }
  }, []);

  const handleReflectionChange = (e) => {
    const newReflection = e.target.value;
    setReflection(newReflection);
    localStorage.setItem('reflection', newReflection);
  };

  return (
    <div className="feature daily-reflections">
      <h4>Daily Reflections</h4>
      <textarea
        value={reflection}
        onChange={handleReflectionChange}
        placeholder="Write your thoughts here..."
      />
      <p>Your Reflection: {reflection || 'None'}</p>
    </div>
  );
};

export default DailyReflections;