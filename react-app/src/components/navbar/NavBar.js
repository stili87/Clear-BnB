import React, { useState, useEffect } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './nav-bar.css'
import mainLogo from '../images/clearbnb-logos_transparent.png'
import { useSelector } from 'react-redux';
import FilterBar from "../filterBar/filterBar"
import { GiMagnifyingGlass } from 'react-icons/gi';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)
  const [displayDropDown, setDisplayDropDown] = useState(false)
  const [terms, setTerms] = useState('')
  const history = useHistory()


  useEffect(() => {
    const closeDropdown = e => {
      if (e.path[1].className !== 'dont-close' && e.path[1].className !== 'dont-close' && e.path[0].className !== 'fa-solid fa-caret-down dont-close' && e.path[0].className !== 'dont-close') {
        setDisplayDropDown(false)
      }
    }

    document.body.addEventListener('click', closeDropdown)

    return () => document.body.removeEventListener('click', closeDropdown)
  }, [])

  const handleSearch = (e) =>{
    e.preventDefault()
    if(!terms){
      history.push(`/home`)
    }else{
      history.push(`/search/${terms}`)
    }
    setTerms('')
  }

  return (
    <>
      <nav id='nav-bar-full-container'>
        <NavLink to='/home' exact={true} activeClassName='active' >
          <img alt='logo' src={mainLogo} id='nav-bar-logo'></img>
        </NavLink>
        <form onSubmit={(e)=>handleSearch(e)}id='search-container'>
          <input onChange={(e)=>setTerms(e.target.value)} value={terms} id='search-input' placeholder='Start Your Search'></input>
          <button id='search-submit-button' >
          <GiMagnifyingGlass ></GiMagnifyingGlass>
          </button>
        </form>
        <div id='nav-bar-right-container'>
          <Link onClick={() => setDisplayDropDown(false)} className='nav-bar-link' to='/properties/new'>Host Your Home</Link>
          <Link onClick={() => setDisplayDropDown(false)} className='nav-bar-link' to='/about'>About Clear-Bnb</Link>
          <div onClick={() => setDisplayDropDown(!displayDropDown)} id='nav-bar-profile-button-container' className='dont-close'>
            <i className="fa-solid fa-bars"></i>
            <img alt='head shot' className='dont-close' id='nav-bar-profile-button' src={sessionUser.picture_url}></img>
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
      <FilterBar />
    </>
  );
}

export default NavBar;
