const GET_BOOKINGS = 'bookings/all'
const ADD_BOOKING = 'bookings/add'
const DELETE_BOOKING = 'bookings/delete'

const getBookingsAction = bookings => ({
    type: GET_BOOKINGS,
    bookings
})

const addBookingAction = booking => ({
    type: ADD_BOOKING,
    booking
})

const deleteBookingAction = bookingId => ({
    type: DELETE_BOOKING,
    bookingId
})

export const getBookingsThunk = () => async dispatch => {
    const response = await fetch('/api/bookings')

    if(response.ok){
        const data = await response.json();
        dispatch(getBookingsAction(data.bookings))
    }
}

export const editBookingThunk = editBooking => async dispatch => {

    const {
        bookingId,
        start_date,
        end_date,
        cost,
        guests
    } = editBooking

    const formData = new FormData()
    formData.append('start_date', start_date)
    formData.append('end_date', end_date)
    formData.append('cost', cost)
    formData.append('guests', guests)

    const response = await fetch(`/api/bookings/${bookingId}`,{
        method: 'PUT',
        body: formData
    })
    const data = await response.json()

    if(response.ok) {
        dispatch(addBookingAction(data))
        return null
    }else if (response.status < 500) {
        if (data.errors) {
            return data.errors
        }
    } else {
        return ['An error occurred. Please try again']
    }

}

export const addBookingThunk = newBooking => async dispatch => {
    const {
        user_id,
        property_id,
        start_date,
        end_date,
        cost,
        guests

    } = newBooking

    const formData = new FormData()
    formData.append('user_id', user_id)
    formData.append('property_id', property_id)
    formData.append('start_date', start_date)
    formData.append('end_date', end_date)
    formData.append('cost', cost)
    formData.append('guests', guests)

    const response = await fetch('/api/bookings',{
        method: 'POST',
        body: formData
    })
    const data = await response.json()

    if(response.ok) {
        dispatch(addBookingAction(data))
        return null
    }else if (response.status < 500) {
        if (data.errors) {
            return data.errors
        }
    } else {
        return ['An error occurred. Please try again']
    }
}

export const deleteBookingThunk = bookingId => async dispatch => {
    const response = await fetch(`/api/bookings/${bookingId}`, {
        method: "DELETE"
    })

    if (response.ok){
        dispatch(deleteBookingAction(bookingId))
    }
}

const bookingReducer = (state={}, action) => {
    switch (action.type) {
        case GET_BOOKINGS:
            let newAllState = {...state}
            action.bookings.forEach(booking => newAllState[booking.id] = booking)
            return newAllState
        case ADD_BOOKING:
            return {...state, [action.booking.id]: action.booking}
        case DELETE_BOOKING:
            let newDeleteState = {...state}
            delete newDeleteState[action.bookingId]
            return newDeleteState
        default:
                return state
    }
}

export default bookingReducer
