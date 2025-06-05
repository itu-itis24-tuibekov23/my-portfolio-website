// src/App.tsx
// DO NOT import BrowserRouter here, as it's already used in main.tsx
import { Routes, Route, Link } from 'react-router-dom'; // Added Link for navigation
import StartPage from './pages/StartPage';
import InnerPage from './pages/InnerPage';
import './App.css';

function App() {
  return (
    <Routes>
      {/* Default route: show StartPage */}
      <Route path="/" element={<StartPage />} />
      {/* Route to the main portfolio page */}
      <Route path="/portfolio" element={<InnerPage />} />
    </Routes>
  );
}

export default App;