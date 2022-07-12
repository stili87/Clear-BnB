import React from "react";
import './home-page.css'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Rating } from 'react-simple-star-rating';


const HomeSingleProperty = ({property}) => {
    const allReviews = Object.values(useSelector(state => state.reviews))
    const allThisReviews = allReviews?.filter(review => review.property_id === property.id)

    const findAvgRating = () => {
        let sum = 0
        allThisReviews?.forEach(review => sum+= review?.rating)
        return Math.floor(sum / allThisReviews?.length)
    }

    let avgRating = findAvgRating()

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })

    const cost = formatter.format(property?.price)

    return (
        <Link to={`/properties/${property?.id}`} id="home-single-property-container">
            <img id="single-home-property-image" alt='property-front' src={property?.photo1_url} />
            <p id="single-home-property-location">{property?.city}, {property?.state}</p>
            <p id="single-home-property-title">{property?.title}</p>
            {allThisReviews?.length > 0 ?<Rating readonly={true} size={15} ratingValue={avgRating*20}></Rating> : <p id="single-home-property-title">New Property</p>}
            <p id="single-home-property-cost">{cost} <span>night</span></p>
        </Link>
    )
}

export default HomeSingleProperty
