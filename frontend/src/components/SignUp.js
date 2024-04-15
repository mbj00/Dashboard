import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const signup = async () => {
    console.log(name, email, password);

    let results = await fetch("http://localhost:5000/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    results = await results.json();
    console.log(results);
    localStorage.setItem("user", JSON.stringify(results.result));
    localStorage.setItem("token", JSON.stringify(results.auth));

    navigate('/');
  }

  
  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/');
    }
  }, [])
  return (
    <div className='signup'>
      <h2><b>Register</b></h2>
      <div className='form'>
        <br />
        <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="" id="" placeholder='Enter Full Name' />
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="" id="" placeholder='Enter E-mail Id' />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" name="" id="" placeholder='Enter Password' />
        <span onClick={signup}>Sign Up</span>
      </div>
    </div>
  )
}
