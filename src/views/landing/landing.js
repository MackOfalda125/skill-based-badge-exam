import React from 'react';
import { useNavigate } from 'react-router-dom';
import './landing.css';

const members = [
  { name: 'Andrew Chan', role: 'UI/UX Designer', github: 'https://github.com/Jasper-Andrew-L-Chan', image: 'https://avatars.githubusercontent.com/u/144504479?v=4' },
  { name: 'Mark Dayrit', role: 'Backend Developer', github: 'https://github.com/yashenyu', image: 'https://avatars.githubusercontent.com/u/185046907?v=4' },
  { name: 'Aldrin Manaloto', role: 'QA Manager', github: 'https://github.com/youdenote', image: 'https://avatars.githubusercontent.com/u/217574506?v=4' },
  { name: 'Mackenzie Ofalda', role: 'Project Manager', github: 'https://github.com/MackOfalda125', image: 'https://avatars.githubusercontent.com/u/204821916?v=4' },
  { name: 'Andre Quizon', role: 'SEO Specialist', github: 'https://github.com/AnonymousDre', image: 'https://avatars.githubusercontent.com/u/135997258?v=4' },
  { name: 'Ric Pangan', role: 'Frontend Developer', github: 'https://github.com/Ricpangan02', image: 'https://avatars.githubusercontent.com/u/205399174?v=4' },
  { name: 'Gian Sitchon', role: 'Solution Architect', github: 'https://github.com/OmegaPH', image: 'https://avatars.githubusercontent.com/u/80980692?v=4' },
];

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-wrapper">
      <div className="landing-container">
        <h1 className="landing-title">Welcome to Our Project</h1>

        <div className="profiles-grid">
          {members.map((member, index) => (
            <div className="profile-card" key={index}>
              <div className="profile-avatar">
                <img src={member.image} alt={`${member.name} avatar`} />
              </div>
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

        <button className="login-btn" onClick={() => navigate('/login')}>
          Go to Login
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
