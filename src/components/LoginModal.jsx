"use client"
import { useState } from 'react';

import PropTypes from 'prop-types';

import './LoginModal.css';

const LoginModal = ({ onLogin }) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleClickToLogin = () => {
    // Validar que se ingresen el usuario y la contraseña
    if (user.trim() === '' || password.trim() === '') {
      return;
    }
    onLogin(user, password);
  };

  return (
    <div className="login-modal">
      <div className="login-form">
        <h2>Iniciar Sesión</h2>
        <label htmlFor="user">Usuario:</label>
        <input
          type="text"
          id="user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleClickToLogin}>Ingresar</button>
      </div>
    </div>
  );
};

// Define y valida las propiedades esperadas en el componente
LoginModal.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginModal;
