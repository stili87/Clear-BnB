const GET_PROPERTIES = 'properties/all'

const getPropertiesAction = properties => ({
    type: GET_PROPERTIES, 
    properties
})

export const getPropertiesThunk = () => async dispatch => {
    const response = await fetch('/api/properties')

    if(response.ok){
        const data  = await response.json();
        dispatch(getPropertiesAction(data.properties))
    }
}


const propertyReducer = (state = {}, action) => {
    switch(action.type){
        case GET_PROPERTIES:
            let newAllState = {...state}
            action.properties.forEach(property => newAllState[property.id] = property)
            return newAllState
        default:
            return state
        }
}


export default propertyReducer
