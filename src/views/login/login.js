import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Invalid email');
    } else {
      setError('');
      alert('Submitted: ' + email);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Simple Email Form</h2>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Enter your email"
        style={{ marginRight: '10px', padding: '5px' }}
      />
      <input type= "password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Enter your password"
        style={{ marginRight: '10px', padding: '5px' }}
    />
      <button type="submit" style={{ padding: '5px 10px' }}>Submit</button>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </form>
  );
}

export default Login;