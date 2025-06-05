// src/pages/StartPage.tsx
import { Link } from 'react-router-dom';
import '../styles/StartPage.scss';

function StartPage() {
  return (
    <div className="start-page">
      <div className="profile-image-container-startpage">
        <img
          src="/Sanzhar_Tuibekovv.jpg" // Image from public folder
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