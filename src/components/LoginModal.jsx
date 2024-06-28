"use client"

import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from 'antd';

import './LoginModal.css';

const LoginModal = ({ onLogin, isAuth }) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [loading1, setLoading1] = useState(false);

  const handleClickToLogin = () => {
    // Validar que se ingresen el usuario y la contraseña
    if (user.trim() === '' || password.trim() === '') {
      return;
    }
    isAuth ? setLoading1(false):setLoading1(true)
    onLogin(user, password);    
  };

  return (
    <div className="login-modal">
      <div className="login-form">
        <h2>INICIAR SESION</h2>
        <label htmlFor="user">Usuario o e-mail:</label>        
        <input
          placeholder="Ingresa e-mail o usuario"
          type='text'
          allowClear
          id="user"
          value={user}
          size='small'
          onChange={(e) => setUser(e.target.value)}          
        />
        <br />
        <label htmlFor="password">Contraseña:</label>
        <input
          placeholder="Ingresa password"
          type="password"
          id="password"
          allowClear
          value={password}
          size='small'
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button size='large' onClick={handleClickToLogin} style={{fontSize: '18px', fontWeight:'bold'}} >INGRESAR</Button>
      </div>
    </div>
  );
};

// Define y valida las propiedades esperadas en el componente
LoginModal.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginModal;
