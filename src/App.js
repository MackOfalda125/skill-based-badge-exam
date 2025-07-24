import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './views/dashboard/dashboard';
import Manage from './views/manage/manage';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/manage" element={<Manage />} />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
