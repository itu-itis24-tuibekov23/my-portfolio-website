import React from 'react';
import '../styles/StartPage.scss';
import profileImage from '../assets/Sanzhar_Tuibekovv.jpg';
import { useNavigate } from 'react-router-dom'; 

function StartPage() {
    const navigate = useNavigate();
  
    const handleKnowMoreClick = () => {
      navigate('/inner'); // Define the path for your Inner Page
    };
  
    return (
      <div className="start-page">
        <div className="profile-image-container">
          <img src={profileImage} alt="Your Profile" className="profile-image" />
        </div>
        <h1>Sanzhar Tuibekov</h1>
        <p>Programmer. Athlete. Innovator. Active hiker</p>
        <button onClick={handleKnowMoreClick}>Know more</button>
      </div>
    );
  }
  
  export default StartPage;