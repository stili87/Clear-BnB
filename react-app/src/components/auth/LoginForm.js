import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const handleDemoClick = async e => {
    e.preventDefault()
    const demoLogin = 'demo@aa.io'
    const demoPass = 'password'
    dispatch(login(demoLogin, demoPass))
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <>
      <form id='login-form' onSubmit={onLogin}>
        <div id='signup-errors'>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div id='login-form-entry'>
          <label htmlFor='email'>Email:</label>
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div id='login-form-entry' className='login-form-last-entry'>
          <label htmlFor='password'>Password:</label>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
        </div>
        <button id='booking-submit-button' type='submit'>Login</button>

      <button id='booking-submit-button' onClick={(e) => handleDemoClick(e)} >Demo Login</button>
      </form>
    </>
  );
};

export default LoginForm;
