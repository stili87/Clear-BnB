const GET_USERS = 'users/all'

const getUsersAction = users => ({
    type: GET_USERS,
    users
})

export const getUsersThunk = () => async dispatch => {
    const response = await fetch('/api/users')

    if (response.ok){
        const data = await response.json()
        dispatch(getUsersAction(data.users))
    }
}

const usersReducer = (state={}, action) => {
    switch(action.type){
        case GET_USERS:
            let newAllState = {...state}
            action.users.forEach(user => newAllState[user.id] = user)
            return newAllState
        default:
            return state
    }
}

export default usersReducer
