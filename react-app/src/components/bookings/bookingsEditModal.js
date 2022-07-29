import React from 'react'
import { useHistory } from 'react-router-dom'

function BookingsEditModal({ picture, start_date, end_date, cost, guests, title, setShowModal }) {
    const history = useHistory()




    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })

    const handleClick = e => {
        history.push('/mytrips')
    }

    return (
        <div id='bookings-confirmed-modal'>
            <img id='bookings-modal-picture' alt='property' src={picture}></img>
            <p id='bookings-modal-sub'>Your trip to {title} has been updated!</p>
            <div id='bookings-modal-dates-container'>
                <div id='bookings-modal-check-dates'>
                    <p id='bookings-modal-date-head'>Check-in</p>
                    <p>{start_date?.toISOString().split('T')[0]}</p>
                </div>
                <div id='bookings-modal-check-dates'>
                    <p id='bookings-modal-date-head'>Check-out</p>
                    <p>{end_date?.toISOString().split('T')[0]}</p>
                </div>
            </div>
                <p>Total Guests: {guests}</p>
                <p id='bookings-modal-date-head'>Total Cost: {formatter.format(cost)}</p>
            <button onClick={(e)=>handleClick(e)} id='booking-delete-button'>Continue to My Trips</button>
        </div>
    )
}

export default BookingsEditModal
