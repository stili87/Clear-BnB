import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addBookingThunk } from '../../store/bookings'
import './bookings.css'

function BookingsMain({ thisProperty }) {
    const today = new Date()
    const day = 60 * 60 * 24 * 1000
    const tommorrow = new Date(today.getTime() + day)
    const nextDay = new Date(tommorrow.getTime() + day)

    const sessionUser = useSelector(state => state.session.user)
    const [errors, setErrors] = useState([])
    const [start_date, setStart_date] = useState(tommorrow)
    const [end_date, setEnd_date] = useState(nextDay)
    const [guests, setGuests] = useState(1)
    const [cost, setCost] = useState(thisProperty?.price * 2 || 0)
    const [disabled, setDisabled] = useState(false)
    const [totalDays, setTotalDays] = useState(1)
    const dispatch = useDispatch()
    const history = useHistory()

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })


    useEffect(() => {

        const diffTime = Math.abs(new Date(start_date) - new Date(end_date))
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (end_date <= start_date) {
            setErrors(['End Date Cannot be prior to or the same as start date'])
            setDisabled(true)
        } else if (start_date < today) {
            setErrors(['Start Date Cannot be today or prior'])
            setDisabled(true)
        }else if(diffDays < 1 ){
            setErrors(['You cannot check-in and checkout on the same day'])
            setDisabled(true)
        }
        else {
            setErrors([])
            setDisabled(false)
        }

        if (end_date === start_date) {
            setCost(thisProperty?.price + thisProperty?.service_fee)
            setTotalDays(1)
        } else {
            setTotalDays(diffDays)
            setCost((diffDays * thisProperty?.price) + thisProperty?.service_fee)
        }
        // eslint-disable-next-line
    }, [start_date, end_date, cost, setCost, thisProperty?.price, thisProperty?.service_fee])


    const handleBookingSubmit = async e => {
        e.preventDefault()

        const newBooking = {
            user_id: sessionUser?.id,
            property_id: thisProperty?.id,
            start_date: start_date?.toISOString().split('T')[0],
            end_date: end_date?.toISOString().split('T')[0],
            cost,
            guests
        }

        const data = await dispatch(addBookingThunk(newBooking))
        if (data) {
            setErrors(data)
        } else {
            history.push('/mytrips')
        }
    }

    const setAddGuest = () => {
        if (guests >= thisProperty?.guests) {
            return
        } else {
            setGuests(guests + 1)
        }
    }

    const setRemoveGuest = () => {
        if (guests === 1) {
            return
        } else {
            setGuests(guests - 1)
        }
    }

    return (
        <form onSubmit={e => handleBookingSubmit(e)} id='bookings-form'>
            {errors?.length > 0 &&
                <div id='bookings-errors-container'>
                    <p id="bookings-errors-header">Please fix the following errors:</p>
                    {errors?.map((error, idx) => <p id='bookings-error' key={idx}>{error}</p>)}
                </div>
            }
            <div id='bookings-cost-div'>
                <p><span id='bookings-cost-per-night'>{formatter.format(thisProperty?.price)}</span> night</p>
            </div>
            <div id='bookings-dates-selection'>
                <div id='bookings-checkin-container'>
                    <label id='booking-checkinout-label'>CHECK-IN</label>
                    <input value={start_date?.toISOString().split('T')[0]} onChange={e => setStart_date(new Date(e.target.value))} type='date'></input>
                </div>
                <div id='bookings-checkin-container'>
                    <label id='booking-checkinout-label'>CHECK-OUT </label>
                    <input value={end_date?.toISOString().split('T')[0]} onChange={e => setEnd_date(new Date(e.target.value))} type='date'></input>
                </div>
            </div>
            <div id='booking-guests-container'>
                <label id='booking-checkinout-label'>GUESTS: ({thisProperty?.guests} MAX)</label>
                <div id='bookings-guests-selection'>
                    <p id='bookings-guests-selection-selector' onClick={() => setRemoveGuest()}>-</p>
                    <p id='bookings-guests-selection-number'>{guests}</p>
                    <p id='bookings-guests-selection-selector' onClick={() => setAddGuest()}>+</p>
                </div>

            </div>
            <label id='booking-price-details-label'>Price Details</label>
            <div id='booking-price-details-container'>
                <div id='booking-price-details-containers'>
                    <p id='price-details-text'>{formatter.format(thisProperty?.price)} x {totalDays} nights</p>
                    <p id='price-details-text'>Service Fee</p>

                </div>
                <div id='booking-price-details-containers'>
                    <p id='price-details-text'>{formatter.format(thisProperty?.price * totalDays)}</p>
                    <p id='price-details-text'>{formatter.format(thisProperty?.service_fee)}</p>

                </div>

            </div>
            <div id='booking-total-cost-container'>
                <p>Total Cost</p>
                <p>{formatter.format(cost)}</p>
            </div>
            <button id='booking-submit-button' disabled={disabled}>{disabled ? 'Fix Dates before reserving' : 'Reserve'}</button>
        </form>

    )
}

export default BookingsMain
