import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ResumeScanner from './components/ResumeScanner/ResumeScanner';
import Dashboard from './components/ResumeScanner/Dashboard';

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full">
      <BrowserRouter>
        <div className="h-full w-full">
          <Routes>
            <Route path="/" element={<ResumeScanner />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;