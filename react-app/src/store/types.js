const GET_TYPES = 'types/all'

const getTypesAction = types => ({
    type: GET_TYPES,
    types
})

export const getTypesThunk = () => async dispatch => {
    const response = await fetch('/api/types')
    if (response.ok){
        const data = await response.json();
        dispatch(getTypesAction(data.types))
    }
}

const typesReducer = (state = {}, action) => {
    switch(action.type){
        case GET_TYPES:
            let newAllState = {...state}
            action.types.forEach(type => newAllState[type.id] = type)
            return newAllState
        default:
            return state
    }
}

export default typesReducer
