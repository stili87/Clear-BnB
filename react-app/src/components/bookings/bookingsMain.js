import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addBookingThunk } from '../../store/bookings'
import './bookings.css'

function BookingsMain({thisProperty}) {
    const today = new Date()
    const tommorrow = new Date(today +1 )
    const sessionUser = useSelector(state => state.session.user)
    const [errors, setErrors] = useState([])
    const [start_date, setStart_date] = useState(today)
    const [end_date, setEnd_date] = useState(tommorrow)
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
        }else {
            setErrors([])
            setDisabled(false)
        }
        const diffTime = Math.abs(new Date(start_date) - new Date(end_date))
        // Need to add one to account for arrival day. 
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24) + 1);
        setCost(diffDays * thisProperty?.price)
        
    }, [start_date, end_date, cost, setCost, thisProperty?.price])


    const handleBookingSubmit = async e => {
        e.preventDefault()

        const newBooking = {
            user_id: sessionUser?.id,
            property_id: thisProperty.id,
            start_date,
            end_date,
            cost,
            guests
        }

        const data = await dispatch(addBookingThunk(newBooking))
        if (data) {
            setErrors(data)
        }else {
            history.push('/home')
        }
    }

    return (
        <form onSubmit={e=> handleBookingSubmit(e)} id='bookings-form'>
            {errors.length > 0 &&
                    <ul>
                        <p id="property-creation-errors-header">Please fix the following errors:</p>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                }
            <label>Pick Dates</label>
            <div id='bookings-dates-selection'>
                <label>Start Date</label>
                <input value={start_date} onChange={e => setStart_date(e.target.value)} type='date'></input>
                <label>End Date</label>
                <input value={end_date} onChange={e => setEnd_date(e.target.value)} type='date'></input>
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

export default BookingsMain
