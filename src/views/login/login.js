import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

 function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      alert(`Email: ${email}\nPassword: ${password}`);
      setLoading(false);
    }, 1000);
  }  

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Please log in Good Sir</h2>
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Enter your email"
        style={{ marginRight: '10px', padding: '5px' }}
        aria-label="Email"
        required
      />
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Enter your password"
        style={{ marginRight: '10px', padding: '5px' }}
        aria-label="Password"
        required
      />
      <label>
        <input
          type="checkbox"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
          style={{ marginRight: '5px' }}
        />

      </label>
      <button
        type="submit"
        style={{ padding: '5px 10px' }}
        disabled={loading || !email || !password}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </form>
  );
}

export default Login;