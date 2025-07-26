import React, { useState, useEffect } from 'react';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const logoUrl = "https://cdn-icons-png.flaticon.com/512/5087/5087579.png"; // change as needed


function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

function handleSubmit(e) {
  e.preventDefault();

  let hasError = false;

  if (!email || !validateEmail(email)) {
    setEmailError("Please enter a valid email address.");
    hasError = true;
  } else {
    setEmailError('');
  }

  if (!password || password.length < 6) {
    setPasswordError("Password must be at least 6 characters.");
    hasError = true;
  } else {
    setPasswordError('');
  }

  if (hasError) return;

  setIsSubmitting(true);

  //Need to import toast from 'react-hot-toast' or similar for notifications
  // toast.loading('Logging in...'); need to para gumana to 

  // setTimeout(() => {
  //   setIsSubmitting(false);
  //   toast.success('Login successful!');

  //   // // Store email if Remember Me is checked
  //   // if (rememberMe) {
  //   //   localStorage.setItem('rememberedEmail', email);
  //   // } else {
  //   //   localStorage.removeItem('rememberedEmail');
  //   // }

  //   setEmail('');
  //   setPassword('');
  //   setRememberMe(false);

  //   // Optional navigation
  //   navigate('/dashboard'); // change this route to your actual dashboard path
  // }, 1000);
}

useEffect(() => {
    const remembered = localStorage.getItem('rememberedEmail');
    if (remembered) {
      setEmail(remembered);
      setRememberMe(true);
    }
  }, []);

  return (
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
            placeholder="Enter your email"
          />
          {emailError && <p className="error">{emailError}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
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

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            Remember me
          </label>
        </div>

        <button
          type="submit"
          className="submit-button"
          placeholder="Login"
          disabled={!email || !password || emailError || passwordError || isSubmitting}
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </main>
  );
}

export default Login;

