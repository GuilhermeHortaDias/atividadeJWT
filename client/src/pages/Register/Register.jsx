import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';

export const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();


    const role = email.endsWith('@admin.com') || email.endsWith('@admin.com.br') ? 'admin' : 'user';

    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password,
        role,
      });
      navigate('/login'); 
    } catch (error) {
      setError(error.response?.data?.error || 'Erro ao cadastrar');
    }
  };

  return (
    <div className='register-container'>
      <div className='login-box'>
        <form onSubmit={handleRegister}  autocomplete="off">
          <div className="user-box">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>Nome de Usuário</label>
          </div>

          <div className="user-box">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Email</label>
          </div>

          <div className="user-box">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Senha</label>
          </div>

          {error && <p className="error">{error}</p>}

          <button className="cta" type='submit'>
            <span className="hover-underline-animation"> CADASTRAR </span>
            <svg
              id="arrow-horizontal"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="10"
              viewBox="0 0 46 16"
            >
              <path
                id="Path_10"
                data-name="Path 10"
                d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                transform="translate(30)"
                fill="#ffffff"
              >
              </path>
            </svg>
          </button>
        </form>
        <p>já possui cadastro? <Link to="/login" className="a2">Logar</Link></p>
        <p><Link to="/" className="a2">Voltar </Link></p>
      </div>
    </div>
  );
};
