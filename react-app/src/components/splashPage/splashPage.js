import './splash-page.css'
import React from 'react';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';


function SplashPage() {
    return (
        <div id='splash-page-full-container'>
            <p id='splash-page-header'>Welcome to Clear BnB</p>
            <p id='splash-page-sub-header'>The Clear Place to Find Your Next Adventure</p>
            <div id='splash-page-login-signup-div'>
                <div id='login-signup-div-left'>
                    <p id='login-signup-header'>Sign-up</p>
                    <SignUpForm />
                </div>
                <div id='login-signup-div-right'>
                    <p id='login-signup-header'>Login</p>
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}

export default SplashPage
