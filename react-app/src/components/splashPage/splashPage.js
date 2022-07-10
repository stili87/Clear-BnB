import './splash-page.css'
import React from 'react';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';
import splashImg from "../images/clearbnb-logos_white.png"


function SplashPage() {
    return (
        <div id='splash-page-full-container'>
            <img alt='logo' src={splashImg} id='splash-page-header'></img>
            <p id='splash-page-sub-header'>The Clear Place To Find Your Next Adventure</p>
            <div id='splash-page-login-signup-div'>
                <div id='login-signup-div-left'>
                    <p id='login-signup-header'>Sign-up</p>
                    <SignUpForm />
                </div>
                <div id='login-signup-div-right'>
                    <p id='login-signup-header' className='login-signup-header-rightaa'>Login</p>
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}

export default SplashPage
