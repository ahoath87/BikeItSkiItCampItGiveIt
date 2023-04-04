import React, { useState } from 'react';
import { authenticateUser, getAllUsers } from '../api/auth';
import { Link } from 'react-router-dom';
import { useAuth } from '../Custom-Hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
const eye = <FontAwesomeIcon icon={faEye} />;

const AuthForm = ({ name, buttonName }) => {
  // const { user } = useAuth();
  const { updateAuthStatus } = useAuth();
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formName = event.target.name;
    const username = event.target.username.value;
    const password = event.target.password.value;
    if (!username || !password) {
      alert('you need a valid username and password');
      console.log('Either no input or password too short');
      return;
    }
    if (password.length < 8) {
      alert('password must be 8 or more characters');
      return;
    }

    if (formName === 'login') {
      await authenticateUser(username, password, formName);
      updateAuthStatus();
    } else {
      const fullName = event.target.fullname.value;
      const address = event.target.address.value;
      const email = event.target.email.value;

      await authenticateUser(
        username,
        password,
        formName,
        fullName,
        email,
        address
      );
      updateAuthStatus();
    }

    const allUsers = await getAllUsers();
    allUsers.forEach((user) => {
      if (event.target.username.value === user.username) {
        console.log('USER IN SYSTEM');
        // const reload = () => {
        //   window.location.href = '/';
        // };
        // reload();
      }
    });
  };

  return (
    <div id='whole-login-form-box'>
      {name === 'login' ? (
        <div>
          <h3 className='form-header'>Log In Here</h3>
        </div>
      ) : (
        <div>
          <h3 className='form-header'>Sign Up Here</h3>
        </div>
      )}

      <form onSubmit={handleSubmit} name={name}>
        <div className='login-form'>
          <input type='text' name='username' placeholder='Username' />

          <input
            type={passwordShown ? 'text' : 'password'}
            name='password'
            placeholder='Password'
          />
        </div>
        <div className='eyeball-container'>
          <i id='eyeball' onClick={togglePasswordVisiblity}>
            {eye}
          </i>
        </div>
        <div className='password-paragraph'>
          <p className='pass-description'>
            {' '}
            password must be at least 8 characters long
          </p>
        </div>
        {name === 'login' ? (
          <div className='loginButt-container'>
            <button className='login-button'>{buttonName}</button>
          </div>
        ) : (
          <div>
            <div className='login-form'>
              <input type='text' name='fullname' placeholder='Full Name' />

              <input type='text' name='address' placeholder='Address' />

              <input type='text' name='email' placeholder='Email Address' />
            </div>
            <div className='loginButt-container'>
              <button className='login-button'>{buttonName}</button>
            </div>
          </div>
        )}
      </form>
      <div className='accountQuestion-container'>
        {name === 'login' ? (
          <p className='accountQuestion'>
            Not a user yet?
            <Link to='/signup' className='login-links'>
              Sign Up Here
            </Link>
          </p>
        ) : (
          <p className='accountQuestion'>
            Already have an account?
            <Link to='/login' className='login-links'>
              Login Here
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export const Login = <AuthForm name={'login'} buttonName={'Login'} />;
export const Signup = <AuthForm name={'register'} buttonName={'Register'} />;
