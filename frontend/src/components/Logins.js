import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";


export default function Logins() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const login = async () => {
    let result = await fetch('http://localhost:5000/login', {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    result = await result.json();
    console.log(result);
    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate('/');
    } else {
      alert("Please enter correct details")
    }
  }

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/');
    }
  }, [])

  return (
    <div className='signup'>
      <h2><b>Log In</b></h2>
      <div className='form'>
        <br />
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="" id="" placeholder='Enter E-mail Id' />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" name="" id="" placeholder='Enter Password' />
        <span onClick={login}>Log In</span>
      </div>
    </div>
  )
}
