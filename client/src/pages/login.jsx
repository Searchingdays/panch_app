import React, { useState } from 'react';

import '../styles/login.css'

//import PropTypes from 'prop-types';

export default function Login({setToken}) {

  const [name, setname] = useState('');
  const [phone, setphone] = useState();
  const [password, setPassword] = useState('');

  // const handleLogin = async (e) => {
  //   e.preventDefault();                           // what is e, prevent default ???
  //   const res = await fetch('/api/login', {
  //     method: 'POST',
  //     body: JSON.stringify({ name, phone, password }),
  //     headers: { 'Content-Type': 'application/json' },
  //   });
  //   const data = await res.json();

  //   if (res.ok && data.token) {

  //   setToken(data.token);
  //   localStorage.setItem('token', data.token);  // not secure in the frontend. use cookies..
  //   alert("Login success");
  //   }
  //   else {
  //       alert("Login fail");

  //   }
  //   console.log(data);
  // };

  const handleLogin = () => {}
  
    return (
      <>
    <div className="login-container">
    <form className='login-form' onSubmit={handleLogin}>
      <h2 className='login-title'>Login</h2>
      <input 
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setname(e.target.value)}
        required
        className='login-input'
      />
      <input
        type="number"
        placeholder="Phone"
        value={phone}
        onChange={e => setphone(e.target.value)}
        required
        className='login-input'
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className='login-input'
      />
      <button type="submit" className='login-button'>Login</button>
    </form>
    </div>
    </>
  );


}