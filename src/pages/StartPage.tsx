// src/pages/StartPage.tsx
import { Link } from 'react-router-dom';
import '../styles/StartPage.scss'; // CRUCIAL: Import StartPage's specific styles

// Import profile image for explicit use in JSX
import sanzharProfileImage from '/Sanzhar_Tuibekovv.jpg'; // Path to profile image in public folder (should work now)

// REMOVE: import backgroundImage from '../assets/carlos-ToNQdoVHVJ0-unsplash.jpg'; // No longer needed for background image element

function StartPage() {
  return (
    <div className="start-page">
      {/* Content for the StartPage */}
      <div className="profile-image-container-startpage">
        <img
          src={sanzharProfileImage} // Use the imported image variable
          alt="Sanzhar Tuibekov"
          className="startpage-profile-image"
        />
      </div>
      <h1>Sanzhar Tuibekov</h1>
      <p className="subtitle">AI & Web Developer | Creative | Innovator</p>
      <p className="intro-text">
        Passionate about building impactful software and exploring cutting-edge AI.
      </p>
      <Link to="/portfolio">
        <button className="know-more-button">Know more</button>
      </Link>
    </div>
  );
}

export default StartPage;
