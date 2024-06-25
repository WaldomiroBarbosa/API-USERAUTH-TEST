import React, { useState } from 'react';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const logUser = (e) => {
    e.preventDefault();

    Axios.post('http://localhost:3001/login', {
      username: username,
      password: password
    })
    .then((response) => {
      const token = response.data.token;
      localStorage.setItem('token', token);
      
      navigate('/home');
    })
    .catch((error) => {
      console.error("There was an error logging the user!", error);
    });
  };

  return (
    <div className="auth-form-container">
      <form className="user_log_form" onSubmit={logUser}>

        <h1 className="title">Logar-se</h1>
        <div className="form_row">

          <label htmlFor="username">
            <div>Nome de usuário:</div>
          </label>
          <input
            type="text"
            value={username}
            name="username"
            onChange={e => setUsername(e.target.value)}
          />

          <label htmlFor="password">
            <div>Senha:</div>
          </label>
          <input
            type="password"
            value={password}
            name="password"
            onChange={e => setPassword(e.target.value)}
          />

        </div>
        <button className="log_user">Logar</button>
      </form>

      <div>
        <label htmlFor="create_user">Não tem cadastro?</label>
        <Link to="/" className="link-btn">
          <button className="create_user">Registrar</button>
        </Link>
      </div>
    </div>
  );
}

export default Login;