import React from 'react'
import { useSelector } from 'react-redux';
import MyTripBooking from './indivdiualBooking';
import './my-trips.css'

function MyTrips() {
    const sessionUser = useSelector(state => state.session.user)
    const allBookings = Object.values(useSelector(state => state.bookings))
    const myBookings = allBookings?.filter(booking => booking?.user_id === sessionUser?.id)
    


    return (
        <div id='my-trips-full-container'>
            <h1 id='my-trips-header'>All of {sessionUser.name}'s Trips</h1>
            <div id='my-trips-multiple-container'>
            {myBookings?.length < 1 && <p>{sessionUser.name} has no trips</p>}
            {myBookings?.map(booking => <MyTripBooking booking={booking} />)}

            </div>
        </div>
    )
}


export default MyTrips