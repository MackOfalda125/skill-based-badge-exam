import React, { useState } from 'react';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function validateEmail(email) {
    return email.includes('@') && email.includes('.');
  }

  function handleSubmit(e) {
    e.preventDefault();
    let valid = true;

    if (!validateEmail(email.trim())) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    } else {
      setEmailError('');
    }

    // if (password.length < 6) {
    //   setPasswordError('Password must be at least 6 characters.');
    //   valid = false;
    // } else {
    //   setPasswordError('');
    // } depends on your requirements

    if (valid) {
      alert(`Submitted:\nEmail: ${email}`);
      // reset form (optional)
      setEmail('');
      setPassword('');
    }
  }

  return (
    <main className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Please login good sir</h2>
        <div className="form-group">
          <label htmlFor="emailInput">Email</label>
          <input
            type="email"
            id="emailInput"
            className="form-input"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          {emailError && <p className="error">{emailError}</p>}
        </div>

       <div className="form-group">
   <label htmlFor="password">Password:</label>
  <input
    type={showPassword ? "text" : "password"}
    id="password"
    className="form-input"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Enter your password"
  />
</div>

<div className="form-group">
  <label className="show-password">
    <input
      type="checkbox"
      checked={showPassword}
      onChange={() => setShowPassword(!showPassword)}
    />
    Show Password
  </label>
  {passwordError && <p className="error">{passwordError}</p>}
</div>

        <button
          type="submit"
          className="submit-button"
          disabled={!email || !password}
        >
          Login
        </button>
      </form>
    </main>
  );
}

export default Login;
