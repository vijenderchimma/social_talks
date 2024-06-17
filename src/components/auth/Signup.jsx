import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import API_URL from '../Api';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/auth/signup`, { name, email, mobileNo, password });
      console.log(res.data);
      if(res.status === 200){
        alert("User Registered Successfully")
        navigate('/login')
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
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required /><br/>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br/>
      <input type="text" placeholder="Mobile" value={mobileNo} onChange={(e) => setMobile(e.target.value)} required /><br/>
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br/>
      <button type="submit">Register</button>
    </form>
    </div>
    </>
  );
}

export default Signup;
