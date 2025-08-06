import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

export default function Signup() {
  const [name, setname] = useState('');
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState('');

 const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({ name, phone, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();

    try {

    if (res.ok) {
        
        console.log(data.message);         // Show message
        setTimeout(() => {
          navigate('/login');     // Redirect after short delay
        }, 2000); // 2 seconds delay
      } else {
        console.log(data.error || 'Signup failed');
       
      }
    } catch (err) {
      
      console.log(err);
    }


  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Sign Up</h2>

      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={e => setname(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Phone"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit">Signup</button>
    </form>
  );
}
