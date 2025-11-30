import React from 'react';
import './LessonsGuides.css';

const LessonsGuides = () => {
 
  const lessons = [
    { title: 'Understanding Stress', link: 'https://jedfoundation.org/resource/understanding-stress/' }, 
        { title: 'Mindfulness Basics', link: 'https://www.mindful.org/meditation/mindfulness-getting-started/' },  
    { title: 'Building Resilience', link: 'https://www.mayoclinic.org/tests-procedures/resilience-training/in-depth/resilience/art-20046311' },  
  ];

  return (
    <div className="feature lessons-guides">
      <h4>Lessons & Guides</h4>
      <ul>
        {lessons.map((lesson, index) => (
          <li key={index}>
            {lesson.link ? (
              <a
                className="lesson-link"
                href={lesson.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {lesson.title}
              </a>
            ) : (
              <a
                href="#"
                className="lesson-link link-placeholder"
                onClick={(e) => e.preventDefault()}
                aria-disabled="true"
                title="No URL provided — paste a URL in this file"
              >
                {lesson.title}
                <span className="hint"> — paste link here</span>
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LessonsGuides;