import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const logoUrl = "https://cdn-icons-png.flaticon.com/512/5087/5087579.png";

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    // Only check if fields are not empty
    if (!email || !password) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);

      setEmail('');
      setPassword('');

      navigate('/dashboard');
    }, 1000);
  }

  return (
    <div className="login-wrapper">
      <main className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="avatar-container">
            <img src={logoUrl} alt="Login Avatar" className="login-avatar" />
          </div>
          <h2>Login</h2>

          <div className="form-group">
            <label htmlFor="emailInput">Email</label>
            <input
              type="email"
              id="emailInput"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
            />
          </div>

          <div className="form-group">
            <div className="show-password">
              <button
                type="button"
                className="eye-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <i className={`fas fa-${showPassword ? 'eye-slash' : 'eye'}`}></i>
              </button>
              <label>Show Password</label>
            </div>
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={!email || !password || isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </main>
    </div>
  );
}

export default Login;
