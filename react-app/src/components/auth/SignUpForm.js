import React, { useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = ({setShowModal}) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [bio, setBio] = useState("")
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  let [picture_url, setPicture_url] = useState(null)
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const handleCancel = e => {
    e.preventDefault()
    setShowModal(false)
  }


  const onSignUp = async (e) => {
    e.preventDefault();

    if (picture_url &&
      !picture_url.name.endsWith("png") &&
      !picture_url.name.endsWith("jpg") &&
      !picture_url.name.endsWith("jpeg") &&
      !picture_url.name.endsWith("gif")
    ) {
      setErrors(['Only .png, .jpg, .jpeg, .gif file types allowed for pictures.'])
      return
    }

    if (!picture_url) {
      picture_url = 'https://www.hrlact.org/wp-content/uploads/2020/12/generic-user-icon.jpg'
    }




    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, picture_url, name, bio, location));
      if (data) {
        setErrors(data);
      } else {
        <Redirect to='/home' />
      }
    } else {
      setErrors(['Passwords do not match.']);
    }
  };

  const updateImage = (e) => {
    const file = e.target.files[0]
    setPicture_url(file)
  }

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <form id='signup-form' onSubmit={onSignUp} className='actualform'>
      <div id='signup-errors'>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div id='signup-form-entry'>
        <label>User Name*:</label>
        <input

          type="text"
          name="username"
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div id='signup-form-entry'>
        <label>Email*:</label>
        <input

          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div id='signup-form-entry'>
        <label>Name*:</label>
        <input

          type="text"
          name="name"
          onChange={e => setName(e.target.value)}
          value={name}
        >
        </input>
      </div>
      <div id='signup-form-entry'>
        <label>Location*:</label>
        <input

          type="text"
          name="location"
          onChange={e => setLocation(e.target.value)}
          value={location}
        >
        </input>
      </div>
      <div id='signup-form-entry'>
        <label>Biography:</label>
        <textarea
          id='signup-text-area'
          name="bio"
          onChange={e => setBio(e.target.value)}
          value={bio}
        ></textarea>
      </div>
      <div id='signup-form-entry'>
        <label>Password*:</label>
        <input

          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div id='signup-form-entry'>
        <label>Repeat Password*:</label>
        <input

          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
        ></input>
      </div>
      <label id='signup-form-entry' className="custom-file-upload">{!picture_url ? 'Profile Picture Upload (optional)' : 'UPLOADED!'}
        <input
          className="pfp"
          accept="image/*"
          onChange={updateImage}
          type="file"
        ></input>
      </label>
      <button id='booking-submit-button' type="submit">Sign Up</button>
      <button id='booking-submit-button' onClick={e => handleCancel(e)} type="submit">Cancel</button>
    </form>

  );
};

export default SignUpForm;
