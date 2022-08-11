import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './nav-bar.css'
import mainLogo from '../images/clearbnb-logos_transparent.png'
import { useSelector } from 'react-redux';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)
  const [displayDropDown, setDisplayDropDown] = useState(false)

  useEffect(() => {
		const closeDropdown = e => {
				if (e.path[1].className !== 'dont-close' && e.path[1].className !== 'dont-close' && e.path[0].className !== 'fa-solid fa-caret-down dont-close' && e.path[0].className !== 'dont-close' ) {
          setDisplayDropDown(false)
				}
		}

		document.body.addEventListener('click', closeDropdown)

		return () => document.body.removeEventListener('click', closeDropdown)
	}, [])

  return (
    <nav id='nav-bar-full-container'>
      <NavLink to='/home' exact={true} activeClassName='active' >
        <img alt='logo' src={mainLogo} id='nav-bar-logo'></img>
      </NavLink>
      <div id='nav-bar-right-container'>
      <Link onClick={() => setDisplayDropDown(false)} className='nav-bar-link' to='/properties/new'>Host Your Home</Link>
      <Link onClick={() => setDisplayDropDown(false)} className='nav-bar-link' to='/about'>About Clear-Bnb</Link>
        <div onClick={() => setDisplayDropDown(!displayDropDown)} id='nav-bar-profile-button-container' className='dont-close'>
        <i className="fa-solid fa-bars"></i>
        <img  alt='head shot' className='dont-close' id='nav-bar-profile-button' src={sessionUser.picture_url}></img>
        </div>
        {displayDropDown &&
          <div id='nav-bar-drop-down'>
            <Link onClick={() => setDisplayDropDown(false)} className='nav-bar-drop-down-link' to='/home'>Home</Link>
            <Link onClick={() => setDisplayDropDown(false)} className='nav-bar-drop-down-link' to={`/profile/${sessionUser?.id}`}>My Profile</Link>
            <Link onClick={() => setDisplayDropDown(false)} className='nav-bar-drop-down-link' to='/mytrips'>My Trips</Link>
            <Link onClick={() => setDisplayDropDown(false)} className='nav-bar-drop-down-link' to='/myproperties'>My Properties</Link>
            <Link onClick={() => setDisplayDropDown(false)} className='nav-bar-drop-down-link' to='/properties/new'>Host Your Home</Link>
            <LogoutButton />
          </div>}
      </div>

    </nav>
  );
}

export default NavBar;
