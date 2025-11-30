import React, { useState, useEffect } from 'react';
import './TasksMindfulness.css';
const TasksMindfulness = () => {
  const [completedTasks, setCompletedTasks] = useState([]);

  const tasks = [
    '5-minute breathing exercise',
    'Write down 3 things you are grateful for',
    'Take a short walk outdoors',
  ];

  useEffect(() => {
    console.log('TasksMindfulness component rendered');
  }, []);

  const toggleTaskCompletion = (task) => {
    const updatedTasks = completedTasks.includes(task)
      ? completedTasks.filter((t) => t !== task)
      : [...completedTasks, task];
    setCompletedTasks(updatedTasks);
    localStorage.setItem('completedTasks', JSON.stringify(updatedTasks));
  };

  return (
    <div className="feature tasks-mindfulness">
      <h4>Tasks & Mindfulness Exercises</h4>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                checked={completedTasks.includes(task)}
                onChange={() => toggleTaskCompletion(task)}
              />
              {task}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksMindfulness;