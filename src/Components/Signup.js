import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import applap from '../Assets/applap.jpg';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login attempt:', { email, password });
        navigate('/dashboard');
      };

      return (
       <> <div>
        <img src={applap} className="samosa" alt="samosa" />
        <form onSubmit={handleSubmit}>
          <h2>Welocome to PAIX <br></br> User Signup</h2>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Log In</button>
        </form>
        </div>
        <footer className="footer">
        <p>© 2023 PAIX. All rights reserved.</p></footer></>
      );
    }

export default Signup;