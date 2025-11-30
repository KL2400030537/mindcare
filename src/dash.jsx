// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './dash.css';
// import { ReactComponent as MoodTrackingIcon } from './icons/mood-tracking.svg';
// import { ReactComponent as DailyReflectionsIcon } from './icons/daily-reflections.svg';
// import { ReactComponent as LessonsGuidesIcon } from './icons/lessons-guides.svg';
// import { ReactComponent as StoriesExperiencesIcon } from './icons/stories-experiences.svg';
// import { ReactComponent as TasksMindfulnessIcon } from './icons/tasks-mindfulness.svg';
// import { ReactComponent as InsightsTipsIcon } from './icons/insights-tips.svg';

// // Update the features array to use React components for icons
// const features = [
//   { title: 'Mood Tracking', description: 'Users can record and monitor their daily moods to understand emotional patterns.', icon: MoodTrackingIcon },
//   { title: 'Daily Reflections / Journals', description: 'A private space to write thoughts, feelings, and experiences.', icon: DailyReflectionsIcon },
//   { title: 'Lessons & Guides', description: 'Short articles and tutorials to educate users on mental health practices.', icon: LessonsGuidesIcon },
//   { title: 'Stories & Experiences', description: 'Inspirational stories from others to motivate and support mental wellness.', icon: StoriesExperiencesIcon },
//   { title: 'Tasks & Mindfulness Exercises', description: 'Daily activities and exercises for stress relief and emotional balance.', icon: TasksMindfulnessIcon },
//   { title: 'Insights & Personalized Tips', description: 'Visual summaries, recommendations, and motivational content based on user activity.', icon: InsightsTipsIcon },
// ];

// const Dashboard = () => {
//   const [userName, setUserName] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch user name from local storage
//     const storedName = localStorage.getItem('userName');
//     if (storedName) {
//       setUserName(storedName);
//     }
//   }, []);

//   const handleFeatureClick = (path) => {
//     navigate(path);
//   };

//   return (
//     <div className="dashboard">
//       <header className="header">
//         <img
//           src={`https://i.pravatar.cc/100?u=${userName}`}
//           alt="User avatar"
//           className="avatar"
//         />
//         <div>
//           <h2>Welcome, {userName || 'Guest'}</h2>
//           <p>Your mental health matters 💚</p>
//         </div>
//       </header>

//       <section>
//         <h3>Features</h3>
//         <div className="features">
//           {features.map((feature) => (
//             <div
//               key={feature.title}
//               className="feature-card"
//               onClick={() =>
//                 handleFeatureClick(
//                   `/${feature.title.replace(/\s+/g, '-').toLowerCase()}`
//                 )
//               }
//             >
//               <span>
//                 <feature.icon className="feature-icon" />
//               </span>
//               <h4>{feature.title}</h4>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section className="motivation">
//         <h3>Today's Motivation</h3>
//         <blockquote>
//           "You don't have to control your thoughts. You just have to stop letting
//           them control you."
//         </blockquote>
//       </section>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './dash.css';

// Update the features array to use placeholder icons
const features = [
  { title: 'Mood Tracking', description: 'Users can record and monitor their daily moods to understand emotional patterns.', icon: '📊' },
  { title: 'Daily Reflections / Journals', description: 'A private space to write thoughts, feelings, and experiences.', icon: '📖' },
  { title: 'Lessons & Guides', description: 'Short articles and tutorials to educate users on mental health practices.', icon: '📚' },
  { title: 'Stories & Experiences', description: 'Inspirational stories from others to motivate and support mental wellness.', icon: '🌟' },
  { title: 'Tasks & Mindfulness Exercises', description: 'Daily activities and exercises for stress relief and emotional balance.', icon: '🧘' },
  { title: 'Insights & Personalized Tips', description: 'Visual summaries, recommendations, and motivational content based on user activity.', icon: '💡' },
  {
  title: "MindCare AI Helper",
  description: "A gentle, supportive mental wellness companion.",
  icon: "🤍",
},
{
  title:"Therapy Sessions",
  description:"Connect with licensed therapists for personalized support.",
  icon:"🛋️",
}

];

const Dashboard = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user name from local storage
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleFeatureClick = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="nav-brand" onClick={() => navigate('/dashboard')}>MindCare</div>
        <div className="nav-links">
          <button className="nav-item" onClick={() => navigate('/dashboard')}>Home</button>
          <button className="nav-item" onClick={() => navigate('/mood-tracking')}>Mood</button>
          <button className="nav-item" onClick={() => navigate('/daily-reflections---journals')}>Journals</button>
          <button className="nav-item" onClick={() => navigate('/lessons-and-guides')}>Lessons</button>
          <button className="nav-item" onClick={() => navigate('/stories-and-experiences')}>Stories</button>
          <button className="nav-item" onClick={() => navigate('/tasks-and-mindfulness-exercises')}>Tasks</button>
          <button className="nav-item" onClick={() => navigate('/insights-and-personalized-tips')}>Insights</button>
          {localStorage.getItem('isAdmin') === 'true' && (
            <button className="nav-item nav-admin" onClick={() => navigate('/admin')}>Admin</button>
          )}
        </div>
        <div className="nav-actions">
          <div className="nav-user">{userName || 'Guest'}</div>
          <button className="nav-logout" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <header className="header">
        <img
          src={`https://i.pravatar.cc/98?u=${userName}`}
          alt="User avatar"
          className="avatar"
        />
        <div>
          <h2>Welcome, {userName || 'Guest'}</h2>
          <p>Your mental health matters 💚</p>
        </div>
      </header>

      <section>
        <h3>Features</h3>
        <div className="features">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="feature-card"
              onClick={() =>
                handleFeatureClick(
  `/${feature.title.replace(/\s+/g, '-').replace(/&/g, 'and').replace(/\//g, '-').toLowerCase()}`
)
              }
            >
              <span className="feature-icon">{feature.icon}</span>
              <h4>{feature.title}</h4>
            </div>
          ))}
        </div>
      </section>

      <section className="motivation">
        <h3>Today's Motivation</h3>
        <blockquote>
          "You don't have to control your thoughts. You just have to stop letting
          them control you."
        </blockquote>
      </section>
    </div>
  );
};

export default Dashboard;