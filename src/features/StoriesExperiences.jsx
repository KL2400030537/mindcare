import React from 'react';
import './StoriesExperiences.css';

const StoriesExperiences = () => {
  const stories = [
    {
      title: 'Story 1: Overcoming Anxiety',
      link: 'https://youtu.be/ZidGozDhOjg?si=O__enGvT5JcBpMlS'
    },
    {
      title: 'Story 2: Journey to Self-Esteem',
      link: 'https://youtu.be/EGEnewYmIWc?si=vRyKxx5WvpYsXPVy'
    },
    {
      title: 'Story 3: Life is so Easy',
      link: 'https://youtu.be/21j_OCNLuYg?si=dUGj53Cf6JA31rh3'
    },
    {
      title: 'Story 4: Self-reliance and Growth',
      link: 'https://youtu.be/LBCEuVgEC7Q?si=lxPfG9e3kNP4kMoC'
    },
  ];

  return (
    <div className="feature stories-experiences">
      <h4>Stories & Experiences</h4>
      <ul>
        {stories.map((story, index) => (
          <li key={index}>
            <a 
              href={story.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="story-link"
            >
              {story.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoriesExperiences;
