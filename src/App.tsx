// src/App.tsx
// DO NOT import BrowserRouter here, as it's already used in main.tsx
// Remove 'Link' from this import, as it's not used directly in App.tsx
import { Routes, Route } from 'react-router-dom'; // Only import Routes and Route
import StartPage from './pages/StartPage';
import InnerPage from './pages/InnerPage';
import './App.css';

function App() {
  return (
    // The Routes component should NOT be wrapped by BrowserRouter here,
    // as BrowserRouter is already wrapping <App /> in main.tsx.
    <Routes>
      {/* Default route: show StartPage */}
      <Route path="/" element={<StartPage />} />
      {/* Route to the main portfolio page */}
      <Route path="/portfolio" element={<InnerPage />} />
    </Routes>
  );
}

export default App;