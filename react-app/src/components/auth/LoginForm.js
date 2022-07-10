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
            required
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
            required
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
        </div>
        <button id='login-form-button' type='submit'>Login</button>
        <p id='login-form-demo-header'>Try without signup?</p>
      </form>
      <button id='login-form-button-demo' onClick={(e) => handleDemoClick(e)} >Demo User</button>
    </>
  );
};

export default LoginForm;
