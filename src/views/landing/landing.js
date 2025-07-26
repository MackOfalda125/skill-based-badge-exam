import React from 'react';
import { useNavigate } from 'react-router-dom';
import './landing.css';

const members = [
  { name: 'Mackenzie Ofalda', role: 'My King' },
  { name: 'Andrew Chan', role: 'Baklang Chinese' },
  { name: 'Ric Pangan', role: 'UI/UX Designer' },
  { name: 'Andre Quizon', role: 'Big Black Nigger' },
  { name: 'Mark Dayrit', role: 'German Lover' },
  { name: 'Gian Sitchon', role: 'Gay ass nig' },
  { name: 'Aldrin Manaloto', role: 'Project Manager' },
];

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <h1 className="landing-title">Welcome to Our Project</h1>

      <div className="profiles-grid">
        {members.map((member, index) => (
          <div className="profile-card" key={index}>
            <div className="profile-avatar"></div>
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </div>
        ))}
      </div>

      <button className="login-btn" onClick={() => navigate('/')}>
        Go to Login
      </button>
    </div>
  );
}

export default LandingPage;
