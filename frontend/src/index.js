import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Admin from './components/Pages/Admin';
import NoPage from './components/Pages/NoPage';
import Upload from './components/Pages/Upload';
import Videos from './components/Channel/Videos';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/videos" element={<Videos />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();