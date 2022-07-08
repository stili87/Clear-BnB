import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBookingThunk } from '../../store/bookings'


function ProfileBooking({booking}) {
    const property = useSelector(state => state?.properties)[booking?.property_id]
    const startDayOfWeek = booking?.start_date.split(',')[0]
    const startDay = booking?.start_date.split(' ')[1]
    const startMonth = booking?.start_date.split(' ')[2]
    const startYear = booking?.start_date.split(' ')[3]
    const endDayOfWeek = booking?.end_date.split(',')[0]
    const endDay = booking?.end_date.split(' ')[1]
    const endMonth = booking?.end_date.split(' ')[2]
    const endYear = booking?.end_date.split(' ')[3]
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
    const dispatch = useDispatch()


    const handleBookingDelete = async () => {
        console.log(booking?.id)
        await dispatch(deleteBookingThunk(booking?.id))
    }


    return (
        <div id='profile-single-booking-container'>
            <p id='profile-booking-header'>
            Hello from booking at {property?.title}
            </p>
            <p id='profile-booking-dates'>
                You are booked from {startDayOfWeek}, {startMonth} {startDay} {startYear} to {endDayOfWeek}, {endMonth} {endDay} {endYear}
            </p>
            <button onClick={()=> setDeleteConfirmOpen(!deleteConfirmOpen)}> Delete this Booking?</button>
            {deleteConfirmOpen && <div id='profile-confirm-delete'>
                <button onClick={()=> handleBookingDelete()}>Delete Booking Permanently</button>
                <button onClick={()=> setDeleteConfirmOpen(!deleteConfirmOpen)}>Cancel Delete</button>
                </div>}
        </div>
    )
}

export default ProfileBooking
