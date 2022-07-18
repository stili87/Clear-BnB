import React from "react";
import './loading-modal.css'
import loading from '../images/loading.gif'


const LoadingModal = () => {

    return (
        <img id="loading-image" alt="loading" src={loading}></img>
    )
}

export default LoadingModal
