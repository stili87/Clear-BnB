import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import MyTripBooking from './indivdiualBooking';
import MyOldTripBooking from './oldIndividualBooking';
import './my-trips.css'

function MyTrips() {
    const today = new Date()
    const sessionUser = useSelector(state => state.session.user)
    const allBookings = Object.values(useSelector(state => state.bookings))
    const myBookings = allBookings?.filter(booking => booking?.user_id === sessionUser?.id).reverse()

    const upComingBookings = myBookings?.filter(booking => {
        console.log(new Date(booking?.start_date).getTime() > today.getTime())
        if (new Date(booking?.start_date).getTime() > today.getTime()) {
            return true
        }
        return false
    }

    )

    const pastBookings = myBookings?.filter(booking => {
        console.log(new Date(booking?.start_date).getTime() > today.getTime())
        if (new Date(booking?.start_date).getTime() < today.getTime()) {
            return true
        }
        return false
    }

    )


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div id='my-trips-full-container'>
            <h1 id='my-trips-header'>All of {sessionUser.name}'s Trips</h1>
            <div id='my-trips-multiple-container'>
                <p id='my-trips-sub-header'>{sessionUser.name}'s Upcoming Trips</p>
                {upComingBookings?.length < 1 && <p>{sessionUser.name} has no upcoming trips</p>}
                {upComingBookings?.map(booking => <MyTripBooking key={booking.id} booking={booking} />)}
            </div>
            <div id='my-trips-multiple-container'>
                <p id='my-trips-sub-header'>{sessionUser.name}'s Past Trips</p>
                {pastBookings?.length < 1 && <p>{sessionUser.name} has no upcoming trips</p>}
                {pastBookings?.map(booking => <MyOldTripBooking key={booking.id} booking={booking} />)}
            </div>
        </div>
    )
}


export default MyTrips
