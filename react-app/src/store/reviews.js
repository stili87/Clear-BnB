const GET_REVIEWS = 'reviews/all'
const ADD_REVIEW = 'reviews/add'

const getReivewsAction = reviews => ({
    type: GET_REVIEWS,
    reviews
})

const addReivewAction = review => ({
    type: ADD_REVIEW,
    review
})

export const getReviewsThunk = () => async dispatch => {
    const response = await fetch('/api/reviews')

    if (response.ok) {
        const data = await response.json()
        dispatch(getReivewsAction(data.reviews))
    }
}

export const addReviewThunk = review => async dispatch => {
    const {
        user_id,
        property_id,
        content,
        rating
    } = review

    const formData = new FormData()
    formData.append('user_id', user_id)
    formData.append('property_id', property_id)
    formData.append('content', content)
    formData.append('content', '')
    formData.append('rating', rating)


    const response = await fetch('/api/reviews', {
        method: 'POST',
        body: formData
    })

    const data = await response.json()
    if (response.ok) {
        dispatch(addReivewAction(data))
        return null
    } else if (response.status < 500) {
        if (data.errors) {
            return data.errors
        }
    } else {
        return ['An error occurred. Please try again']
    }

}

const reviewsReducer = (state={}, action) => {
    switch (action.type) {
        case GET_REVIEWS:
            let newAllState = {}
            action.reviews.forEach(review => newAllState[review.id] = review)
            return newAllState
        case ADD_REVIEW:
            let newAddState = {...state, [action.review.id]: action.review}
            return newAddState
        default:
            return state
    }
}

export default reviewsReducer
