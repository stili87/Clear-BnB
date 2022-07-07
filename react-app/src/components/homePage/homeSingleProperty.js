import React from "react";
import './home-page.css'

const HomeSingleProperty = ({property}) => {

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })

    const cost = formatter.format(property?.price)

    return (
        <div id="home-single-property-container">
            <img id="single-home-property-image" alt='property-front' src={property?.photo1_url} />
            <p id="single-home-property-location">{property?.city}, {property?.state}</p>
            <p id="single-home-property-title">{property?.title}</p>
            <p id="single-home-property-cost">{cost} <span>night</span></p>
        </div>
    )
}

export default HomeSingleProperty
