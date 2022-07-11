import React, { useEffect } from 'react'
import ProfileBooking from './profileBookings';
import { useDispatch, useSelector } from 'react-redux';
import './profile.css'
import { getBookingsThunk } from '../../store/bookings';


function Profile() {
    const sessionUser = useSelector(state => state.session.user)
    const allBookings = Object.values(useSelector(state => state.bookings))
    const bookings = allBookings.filter(booking => booking.user_id === sessionUser.id)

return (
    <div id='profile-full-container'>
        <h1>Hello {sessionUser?.name}</h1>
        <div id='profile-bookings-container'>
            {bookings?.length > 0 && bookings?.map(booking => <ProfileBooking key={booking.id} booking={booking} />)}
        </div>

    </div>
)
}

export default Profile
