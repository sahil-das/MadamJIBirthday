import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BirthdayCard from "./components/BirthdayCard";
import LetterPage from "./components/LetterPage";
import DiaryPage from "./components/DiaryPage";
import FinalWhisper from "./components/FinalWhisper";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BirthdayCard />} />
        <Route path="/letter" element={<LetterPage />} />
        <Route path="/surprise" element={<DiaryPage />} />
        <Route path="/final-whisper" element={<FinalWhisper />} />
      </Routes>
    </Router>
  );
}
