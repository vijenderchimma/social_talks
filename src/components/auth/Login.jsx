import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';
import API_URL from '../Api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      if (res.status === 200) {
        localStorage.setItem('authToken', res.data.token);
        localStorage.setItem('userId', res.data.userId)
        navigate('/', { reverse: true })
      }

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    <Navbar />
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br />
        <button type="submit">Login</button>
      </form>
    </div>
    </>
  );
}

export default Login;
