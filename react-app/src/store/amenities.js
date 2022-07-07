const GET_AMENITIES = 'amenities/all'

const getAmenitiesAction = amenities => ({
    type: GET_AMENITIES,
    amenities
})

export const getAmenitiesThunk = () => async dispatch => {
    const response = await fetch('/api/amenities')
    if (response.ok){
        const data = await response.json();
        dispatch(getAmenitiesAction(data.amenities))
    }
}

const amenityReducer = (state = {}, action) => {
    switch(action.type){
        case GET_AMENITIES:
            let newAllState = {...state}
            action.amenities.forEach(amenitiy => newAllState[amenitiy.id] = amenitiy)
            return newAllState
        default: 
            return state
    }
}

export default amenityReducer
