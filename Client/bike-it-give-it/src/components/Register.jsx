import React from 'react';
import { Signup } from './AuthForm';
// import '../CSS/register.css';

const Register = () => {
  return (
    <div className='register-container'>
      <div className='register-content'>
        <div className='form'>{Signup}</div>
      </div>
    </div>
  );
};

export default Register;
