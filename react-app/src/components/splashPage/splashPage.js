import './splash-page.css'
import React, { useEffect, useState } from 'react';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';
import splashImg from "../images/clearbnb-logos_white.png"
import { Modal } from '../../context/Modal'


function SplashPage() {

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div id='splash-page-full-container'>
            <img alt='logo' src={splashImg} id='splash-page-header'></img>
            <p id='splash-page-sub-header'>The Clear Place To Find Your Next Adventure</p>
            <div id='splash-page-login-signup-div'>
                <div id='login-signup-div-right'>
                    <p id='login-signup-header' >Login</p>
                    <p id='login-signup-modal-click' onClick={() => setShowModal(true)}>Click Here to Sign Up</p>
                    <LoginForm />
                </div>
            </div>
            {showModal && <Modal>
                <div id='login-signup-div-left'>
                    <p id='login-signup-header'>Sign-up For Your Next Adventure</p>
                    <p id='login-signup-subheader'>*required</p>
                    <SignUpForm setShowModal={setShowModal} />
                </div>
            </Modal>}
        </div>
    )
}

export default SplashPage
