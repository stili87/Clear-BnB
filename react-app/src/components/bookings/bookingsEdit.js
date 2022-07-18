import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { deleteBookingThunk, editBookingThunk } from '../../store/bookings'
import './bookings.css'

function BookingsEdit() {
    const bookingId = Number(useParams().id)
    const thisBooking = useSelector(state => state.bookings)[bookingId]
    const thisProperty = useSelector(state => state.properties)[thisBooking?.property_id]
    const history = useHistory()

    if (!thisBooking) {
        history.push('/404')
    }

    const today = new Date()
    const day = 60 * 60 * 24 * 1000
    const tommorrow = new Date(today.getTime() + day)
    const nextDay = new Date(tommorrow.getTime() + day)

    const sessionUser = useSelector(state => state.session.user)
    const [errors, setErrors] = useState([])
    const [start_date, setStart_date] = useState(new Date(thisBooking?.start_date) || tommorrow)
    const [end_date, setEnd_date] = useState(new Date(thisBooking?.end_date) || nextDay)
    const [guests, setGuests] = useState(thisBooking?.guests || 1)
    const [cost, setCost] = useState(thisProperty?.price * 2 || 0)
    const [disabled, setDisabled] = useState(false)
    const [totalDays, setTotalDays] = useState(1)
    const [openDelete, setOpenDelete] = useState(false)
    const dispatch = useDispatch()

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })

    if (sessionUser?.id !== thisBooking?.user_id) {
        history.push('/404')
    }

    useEffect(() => {
        const diffTime = Math.abs(new Date(start_date) - new Date(end_date))
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (end_date <= start_date) {
            setErrors(['End Date cannot be prior to or the same as start date'])
            setDisabled(true)
        } else if (start_date < today) {
            setErrors(['Start Date cannot be today or prior'])
            setDisabled(true)
        } else if (diffDays < 1) {
            setErrors(['You cannot check-in and checkout on the same day.'])
            setDisabled(true)
        } else if (diffDays > 100) {
            setErrors(['You cannot rent for more than 100 days.'])
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

    const handleDeleteBooking = async () => {
        await dispatch(deleteBookingThunk(bookingId))
        history.push('/mytrips')
    }

    const setEnd_dateF = (e) => {
        if(e.target.value){
            setEnd_date(new Date(e.target.value))
        }

    }

    const setStart_dateF = e => {
        if(e.target.value){
            setStart_date(new Date(e.target.value))
        }
    }



    return (
        <>
        {thisBooking && 
        <div id='bookings-edit-full'>
            <p id='bookings-edit-header'>Edit Your Trip at {thisProperty?.title}</p>
            <img id='bookings-edit-property-img' alt='property' src={thisProperty?.photo1_url}></img>
            <div id='bookings-edit-inner-container'>
                <div id='bookings-edit-left'>
                    <p id='bookings-edit-current-header'>Current Trip Information</p>
                    <div id='bookings-edit-current-dates-contianer'>
                        <div id='bookings-edit-current-dates'>
                            <p>CURRENT CHECK-IN</p>
                            <p>{thisBooking?.start_date}</p>
                        </div>
                        <div id='bookings-edit-current-dates'>
                            <p>CURRENT CHECK-OUT</p>
                            <p>{thisBooking?.end_date}</p>
                        </div>
                    </div>
                    <div id='bookings-edit-current-dates'>
                        <p>CURRENT GUESTS</p>
                        <p>{thisBooking?.guests}</p>
                    </div>
                    <div id='bookings-edit-current-dates'>
                        <p>CURRENT COST</p>
                        <p>{formatter.format(thisBooking?.cost)}</p>
                    </div>
                    <button onClick={()=>setOpenDelete(!openDelete)} id='booking-submit-button'>Cancel this Trip</button>
                    {openDelete &&
                        <div id='booking-edit-confirm-delete'>
                            <p>Are you sure you want to cancel this trip?</p>
                            <div id='booking-edit-confirm-delete-buttons-container'>
                                <button id='booking-delete-button' onClick={()=>handleDeleteBooking()}>Confirm</button>
                                <button id='booking-delete-button' onClick={()=>setOpenDelete(!openDelete)}>Keep Trip</button>

                            </div>

                        </div>
                    }
                </div>


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
                            <input min={tommorrow.toISOString().split('T')[0]} value={start_date?.toISOString().split('T')[0]} onChange={e => setStart_dateF(e)} type='date'></input>
                        </div>
                        <div id='bookings-checkin-container'>
                            <label id='booking-checkinout-label'>CHECK-OUT </label>
                            <input min={tommorrow.toISOString().split('T')[0]} value={end_date?.toISOString().split('T')[0]} onChange={e => setEnd_dateF(e)} type='date'></input>
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
                    <button id='booking-submit-button' disabled={disabled}>{disabled ? 'Fix Dates before reserving' : 'Update Trip'}</button>

                </form>
            </div>
        </div>
                }
                </>
    )
}

export default BookingsEdit
