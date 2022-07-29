import React from "react";
import './about.css'
import profilePic from '../images/profile-pic.png'

const About = () => {
    return (
        <div className='about-outer-container'>
            <h1 className='about-header'>About Clear-Bnb</h1>
            <img className='about-image' alt="about-profile" src={profilePic}></img>
            <div className='about-developer'>
            <h2 className='developer-info'>Developed by Andrew Stilinovic</h2>
            <p className='developer-info-sub'>Clear-Bnb is an Air-Bnb clone that allows users to simulate listing their properties for rentals.  Users can also book and review properties to allow users to see what others think about the rental.</p>
            <p className='developer-info-sub'>This was my last project while learning the basics of web development at App Academy; built from scratch using a large variety of technologies.</p>
            <p className='developer-info-sub'>If you are looking for a passionate, hardworking web developer please checkout my portfolio site or other sites listed below. Thank you for stopping by!</p>
            <div className='my-links'>
                <p className='my-links-header'>Links To My Information</p>
                <a rel="noreferrer" href='https://github.com/stili87/Clear-BnB' target='_blank' className='developer-link'>Github</a>
                <a rel="noreferrer" href='https://www.linkedin.com/in/andrew-stilinovic-94277180/' target='_blank' className='developer-link'>LinkedIn</a>
                <a rel="noreferrer" href='http://www.andrew-stilinovic.com/' target='_blank' className='developer-link'>My Portfolio</a>
                <a rel="noreferrer" href='https://better-reads-aa.herokuapp.com/' target='_blank' className='developer-link'>Better Reads - A Good Reads Clone</a>
                <a rel="noreferrer" href='https://felp-aa.herokuapp.com/' target='_blank' className='developer-link'>Felp - A Yelp Clone</a>
            </div>
            </div>
            <div className='tech-div'>
                <p className='tech-header'>Some of the Technologies Used</p>
                <a rel="noreferrer" className="developer-link" href='https://flask.palletsprojects.com/en/2.1.x/' target='_blank'>Flask</a>
                <a rel="noreferrer" className="developer-link" href='https://reactjs.org/docs/getting-started.html' target='_blank'>React </a>
                <a rel="noreferrer" className="developer-link" href='https://redux.js.org/' target='_blank'>Redux</a>
                <a rel="noreferrer" className="developer-link" href='https://www.sqlalchemy.org/' target='_blank'>SQLAlchemy</a>
            </div>
        </div>
    )
}

export default About
