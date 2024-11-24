import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate , Link} from 'react-router-dom';
import './index.css'

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      const { token, role , username} = response.data;


      localStorage.setItem('token', token);
      localStorage.setItem('userName', username);

      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Erro ao fazer login', error);
    }
  };

  return (
    <div className='register-container'>
      <div className='login-box'>
        <form onSubmit={handleLogin}  autocomplete="off">
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

         
          <button className="cta" type='submit'>
            <span className="hover-underline-animation"> ENTRAR </span>
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
              />
            </svg>
          </button>
        </form>
        <p>Não tem uma conta? <Link to="/register" className="a2">Cadastre-se</Link></p>
        <p><Link to="/" className="a2">Voltar</Link></p>
      </div>
    </div>
  );

};



