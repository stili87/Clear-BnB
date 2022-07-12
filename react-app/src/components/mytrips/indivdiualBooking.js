import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import './my-trips.css'

function MyTripBooking({booking}) {
    const thisProperty = useSelector(state => state.properties)[booking.property_id]
    const history = useHistory()

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })

    const handleEditButton = () => {
        history.push(`/bookings/${booking.id}/edit`)
    }

    return (
        <div id='my-trips-single-booking-full'>
            <Link to={`/properties/${thisProperty?.id}`} ><img alt='property' id='my-trips-single-booking-prop-img' src={thisProperty?.photo1_url}></img></Link>
            <Link to={`/properties/${thisProperty?.id}`} id='my-trips-single-booking-prop-title'>Trip to {thisProperty?.title}</Link>
            <p id='my-trips-single-booking-dates'>From: {booking?.start_date} to {booking?.end_date}</p>
            <p id='my-trips-single-booking-dates'>{thisProperty?.address}</p>
            <p id='my-trips-single-booking-dates'>{thisProperty?.city}, {thisProperty?.state} {thisProperty?.zipcode}</p>
            <p id='my-trips-single-booking-cost'>Total Cost: {formatter.format(booking.cost)}</p>
            <button onClick={()=>handleEditButton()} id='my-trips-single-booking-edit-button'>Edit this Trip</button>
        </div>
        )
        
}

export default MyTripBooking
