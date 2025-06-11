// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import InnerPage from './pages/InnerPage';
import './App.css'; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/portfolio" element={<InnerPage />} />
    </Routes>
  );
}

export default App;
