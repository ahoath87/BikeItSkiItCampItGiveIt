import React from 'react';
import { Login } from './AuthForm';
// import '../CSS/login.css';

const LoginHere = () => {
  return (
    <div className='login-container'>
      <div className='login-content'>
        <div>{Login}</div>
      </div>
    </div>
  );
};

export default LoginHere;
