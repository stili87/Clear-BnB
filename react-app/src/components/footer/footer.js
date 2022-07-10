import React from 'react';
import './footer.css'



function Footer() {

    return (
        <div id='footer-container'>
            <div id='footer-info-container'>
                <div id='footer-info-header'>
                    Developer Contact Information
                </div>
                <p id='footer-info-contact'>Andrew Stilinovic</p>
                <p id='footer-info-contact'>stili87@gmail.com</p>
            </div>
            <div id='footer-info-container'>
                <div id='footer-info-header'>
                    About the Developer
                </div>
                <a id='footer-info-item' rel="noreferrer" target='_blank' href='https://github.com/stili87'>Github</a>
                <a id='footer-info-item' rel="noreferrer" href='https://www.linkedin.com/in/andrew-stilinovic-94277180/'>LinkedIn</a>
            </div>
            <div id='footer-info-container'>
                <div id='footer-info-header'>
                    Other Projects
                </div>
                <a id='footer-info-item' rel="noreferrer" target='_blank' href='https://felp-aa.herokuapp.com/'>Felp</a>
                <a id='footer-info-item' rel="noreferrer" target='_blank' href='https://better-reads-aa.herokuapp.com/'>Better Reads</a>
            </div>
            <div id='footer-info-container'>
                <div id='footer-info-header'>
                    Technologies Used
                </div>
                <div id='footer-tech-container'>
                <p id='footer-info-contact'>React,</p>
                <p id='footer-info-contact'>Redux,</p>
                <p id='footer-info-contact'>Flask,</p>
                <p id='footer-info-contact'>Flask Alembic,</p>
                <p id='footer-info-contact'>Docker,</p>
                <p id='footer-info-contact'>AWS S3 Buckets,</p>
                <p id='footer-info-contact'>CSS,</p>
                <p id='footer-info-contact'>HTML,</p>
                <p id='footer-info-contact'>PostgreSQL,</p>
                <p id='footer-info-contact'>Python,</p>
                <p id='footer-info-contact'>JavaScript</p>

                </div>
            </div>
        </div>
    )
}


export default Footer
