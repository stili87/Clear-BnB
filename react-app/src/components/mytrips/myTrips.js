import React, {useEffect} from 'react'
import { useSelector } from 'react-redux';
import MyTripBooking from './indivdiualBooking';
import './my-trips.css'

function MyTrips() {
    const sessionUser = useSelector(state => state.session.user)
    const allBookings = Object.values(useSelector(state => state.bookings))
    const myBookings = allBookings?.filter(booking => booking?.user_id === sessionUser?.id).reverse()
    
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    return (
        <div id='my-trips-full-container'>
            <h1 id='my-trips-header'>All of {sessionUser.name}'s Trips</h1>
            <div id='my-trips-multiple-container'>
            {myBookings?.length < 1 && <p>{sessionUser.name} has no trips</p>}
            {myBookings?.map(booking => <MyTripBooking key={booking.id} booking={booking} />)}

            </div>
        </div>
    )
}


export default MyTrips
