import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { editBookingThunk } from '../../store/bookings'
import './bookings.css'

function BookingsEdit() {
    const bookingId = Number(useParams().id)
    const thisBooking = useSelector(state => state.bookings)[bookingId]
    const thisProperty = useSelector(state => state.properties)[thisBooking?.property_id]

    const today = new Date()
    const day = 60 * 60 * 24 * 1000
    const tommorrow = new Date(today.getTime() + day)
    const nextDay = new Date(tommorrow.getTime() +day)
    
    const sessionUser = useSelector(state => state.session.user)
    const [errors, setErrors] = useState([])
    const [start_date, setStart_date] = useState(new Date(thisBooking?.start_date) || tommorrow)
    const [end_date, setEnd_date] = useState(new Date(thisBooking?.end_date) || nextDay)
    const [guests, setGuests]  = useState(0)
    const [cost, setCost] = useState(thisProperty?.price * 2 || 0)
    const [disabled, setDisabled] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })

    useEffect(() => {
        if (guests < 1) {
            setGuests(1)
        } else if (guests > thisProperty?.guests){
            setGuests(thisProperty?.guests)
        }
    },[guests, setGuests, thisProperty, thisProperty?.guests])

    useEffect(() => {
        if(end_date < start_date) {
            setErrors(['End Date Cannot be prior to start date'])
            setDisabled(true)
        }else if(start_date < today) {
            setErrors(['Start Date Cannot be today or prior'])
            setDisabled(true)
        }else {
            setErrors([])
            setDisabled(false)
        }

        if(end_date === start_date){
            setCost(thisProperty?.price + thisProperty?.service_fee)
        }else {
            const diffTime = Math.abs(new Date(start_date) - new Date(end_date))
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setCost((diffDays * thisProperty?.price) + thisProperty?.service_fee)
        }
        // eslint-disable-next-line
    }, [start_date, end_date, cost, setCost, thisProperty?.price, thisProperty?.service_fee])


    const handleBookingSubmit = async e => {
        e.preventDefault()

        const editBooking = {
            bookingId,
            user_id: sessionUser?.id,
            property_id: thisProperty?.id,
            start_date: start_date?.toISOString().split('T')[0],
            end_date: end_date?.toISOString().split('T')[0],
            cost,
            guests
        }

        const data = await dispatch(editBookingThunk(editBooking))
        if (data) {
            setErrors(data)
        }else {
            history.push('/home')
        }
    }

    return (
        <form onSubmit={e=> handleBookingSubmit(e)} id='bookings-form'>
            {errors?.length > 0 &&
                    <ul>
                        <p id="property-creation-errors-header">Please fix the following errors:</p>
                        {errors?.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                }
            <label>Pick Dates</label>
            <div id='bookings-dates-selection'>
                <label>Start Date</label>
                <input value={start_date?.toISOString().split('T')[0]} onChange={e => setStart_date(new Date(e.target.value))} type='date'></input>
                <label>End Date</label>
                <input value={end_date?.toISOString().split('T')[0]} onChange={e => setEnd_date(new Date(e.target.value))} type='date'></input>
            </div>
            <label>Number of Guests (maximum = {thisProperty?.guests})</label>
            <div id='bookings-guests-selection'>
                <p id='bookings-guests-selection-selector' onClick={()=> setGuests(guests-1)}>-</p>
                <p id='bookings-guests-selection-number'>{guests}</p>
                <p id='bookings-guests-selection-selector' onClick={()=> setGuests(guests+1)}>+</p>
            </div>
            <label>Total Cost</label>
            <p>{formatter.format(cost)}</p>
            <button disabled={disabled}>Submit Booking</button>
        </form>

    )
}

export default BookingsEdit
