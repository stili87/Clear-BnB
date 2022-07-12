import { getBookingsThunk } from "./bookings"
import { getReviewsThunk } from "./reviews"

const GET_PROPERTIES = 'properties/all'
const ADD_PROPERTY = 'properties/add'
const DELETE_PROPERTY = 'properties/delete'

const getPropertiesAction = properties => ({
    type: GET_PROPERTIES,
    properties
})

const addPropertyAction = property => ({
    type: ADD_PROPERTY,
    property
})

const deletePropertyAction = propertyId => ({
    type: DELETE_PROPERTY,
    propertyId
})

export const getPropertiesThunk = () => async dispatch => {
    const response = await fetch('/api/properties')

    if (response.ok) {
        const data = await response.json();
        dispatch(getPropertiesAction(data.properties))
    }
}

export const editPropertyThunk = editProperty => async dispatch => {
    const {
        title,
        description,
        address,
        city,
        state,
        zipcode,
        lat,
        lng,
        price,
        service_fee,
        bedrooms,
        bathrooms,
        guests,
        user_id,
        property_types,
        property_amenities,
        photo1_url,
        photo2_url,
        photo3_url,
        propertyId
    } = editProperty

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('address', address)
    formData.append('city', city)
    formData.append('state', state)
    formData.append('zipcode', zipcode)
    formData.append('lat', lat)
    formData.append('lng', lng)
    formData.append('price', price)
    formData.append('service_fee', service_fee)
    formData.append('bedrooms', bedrooms)
    formData.append('bathrooms', bathrooms)
    formData.append('guests', guests)
    formData.append('user_id', user_id)
    formData.append('property_types', property_types)
    formData.append('property_amenities', property_amenities)
    formData.append('photo1_url', photo1_url)
    formData.append('photo2_url', photo2_url)
    formData.append('photo3_url', photo3_url)

    const response = await fetch(`/api/properties/${propertyId}`, {
        method: "PUT",
        body: formData
    })

    const data = await response.json()
    if (response.ok) {
        dispatch(addPropertyAction(data))
        return null
    } else if (response.status < 500) {
        if (data.errors) {
            return data.errors
        }
    } else {
        return ['An error occurred. Please try again']
    }



}

export const addPropertyThunk = newProperty => async dispatch => {
    const {
        title,
        description,
        address,
        city,
        state,
        zipcode,
        lat,
        lng,
        price,
        service_fee,
        bedrooms,
        bathrooms,
        guests,
        user_id,
        property_types,
        property_amenities,
        photo1_url,
        photo2_url,
        photo3_url
    } = newProperty

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('address', address)
    formData.append('city', city)
    formData.append('state', state)
    formData.append('zipcode', zipcode)
    formData.append('lat', lat)
    formData.append('lng', lng)
    formData.append('price', price)
    formData.append('service_fee', service_fee)
    formData.append('bedrooms', bedrooms)
    formData.append('bathrooms', bathrooms)
    formData.append('guests', guests)
    formData.append('user_id', user_id)
    formData.append('property_types', property_types)
    formData.append('property_amenities', property_amenities)
    formData.append('photo1_url', photo1_url)
    formData.append('photo2_url', photo2_url)
    formData.append('photo3_url', photo3_url)


    const response = await fetch('/api/properties', {
        method: "POST",
        body: formData
    })

    const data = await response.json()
    if (response.ok) {
        dispatch(addPropertyAction(data))
        return null
    } else if (response.status < 500) {
        if (data.errors) {
            return data.errors
        }
    } else {
        return ['An error occurred. Please try again']
    }
}

export const deletePropertyThunk = propertyId => async dispatch => {
    const response = await fetch(`/api/properties/${propertyId}`, {
        method: 'DELETE'
    })

    if (response.ok){
        await dispatch(deletePropertyAction(propertyId))
        await dispatch(getBookingsThunk())
        await dispatch(getReviewsThunk())
    }
}


const propertyReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_PROPERTIES:
            let newAllState = {}
            action.properties.forEach(property => newAllState[property.id] = property)
            return newAllState
        case ADD_PROPERTY:
            let newAddState = { ...state, [action.property.id]: action.property }
            return newAddState
        case DELETE_PROPERTY:
            let newDeleteState = {...state}
            delete newDeleteState[action.propertyId]
            return newDeleteState
        default:
            return state
    }
}


export default propertyReducer
