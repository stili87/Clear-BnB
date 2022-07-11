const GET_REVIEWS = 'reviews/all'

const getReivewsAction = reviews => ({
    type: GET_REVIEWS,
    reviews
})

export const getReviewsThunk = () => async dispatch => {
    const response = await fetch('/api/reviews')

    if (response.ok) {
        const data = await response.json()
        dispatch(getReivewsAction(data.reviews))
    }
}

const reviewsReducer = (state={}, action) => {
    switch (action.type) {
        case GET_REVIEWS:
            let newAllState = {}
            action.reviews.forEach(review => newAllState[review.id] = review)
            return newAllState
        default:
            return state
    }
}

export default reviewsReducer
