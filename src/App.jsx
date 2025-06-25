import React, { useState } from 'react';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BirthdayCard from "./components/BirthdayCard";
import LetterPage from "./components/LetterPage";
import DiaryPage from "./components/DiaryPage";
import FinalWhisper from "./components/FinalWhisper";

import usePageTracker from './hooks/usePageTracker';

import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';



export default function App() {
  const [token, setToken] = useState('');

  return (
    <Router>
      <AppRoutes token={token} setToken={setToken} />
    </Router>
  );
}

function AppRoutes({ token, setToken }) {
  usePageTracker();
  return (
    <Routes>
      <Route path="/" element={<BirthdayCard />} />
      <Route path="/letter" element={<LetterPage />} />
      <Route path="/surprise" element={<DiaryPage />} />
      <Route path="/final-whisper" element={<FinalWhisper />} />
      <Route path="/admin" element={<AdminLogin setToken={setToken} />} />
      <Route path="/admin/dashboard" element={<AdminDashboard token={token} />} />
    </Routes>
  );
}
