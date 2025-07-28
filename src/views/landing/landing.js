import React from 'react';
import { useNavigate } from 'react-router-dom';
import './landing.css';

const members = [
  { name: 'Mackenzie Ofalda', role: 'My King', github: 'https://github.com/mackenzie' },
  { name: 'Andrew Chan', role: 'Baklang Chinese', github: 'https://github.com/andrew' },
  { name: 'Ric Pangan', role: 'UI/UX Designer', github: 'https://github.com/Ricpangan02' },
  { name: 'Andre Quizon', role: 'Big Black Nigger', github: 'https://github.com/andre' },
  { name: 'Mark Dayrit', role: 'German Lover', github: 'https://github.com/mark' },
  { name: 'Gian Sitchon', role: 'Gay ass nig', github: 'https://github.com/gian' },
  { name: 'Aldrin Manaloto', role: 'Project Manager', github: 'https://github.com/aldrin' },
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
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              className="github-btn"
            >
              View GitHub
            </a>
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
