import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Dashboard from './dash.jsx';
import Login from './Login.jsx';
import AdminDashboard from './AdminDashboard.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MoodTracking from './features/MoodTracking';
import DailyReflections from './features/DailyReflections';
import LessonsGuides from './features/LessonsGuides';
import StoriesExperiences from './features/StoriesExperiences';
import TasksMindfulness from './features/TasksMindfulness';
import InsightsTips from './features/InsightsTips';
import MindCareAIHelper from './features/MindCareAI.jsx';
import Therapy from "./features/Therapy.jsx";




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/mood-tracking" element={<MoodTracking />} />
        <Route path="/daily-reflections---journals" element={<DailyReflections />} />
        <Route path="/lessons-and-guides" element={<LessonsGuides />} />
        <Route path="/stories-and-experiences" element={<StoriesExperiences />} />
        <Route path="/tasks-and-mindfulness-exercises" element={<TasksMindfulness />} />
        <Route path="/insights-and-personalized-tips" element={<InsightsTips />} />
        <Route path="/mindcare-ai-helper" element={<MindCareAIHelper />} />
        <Route path="/therapy-sessions" element={<Therapy />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);