import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Rating } from 'react-simple-star-rating'
import './single-review.css'
import EditReview from './editReview'



function SingleReivewDisplay({ review }) {
    const thisProperty = useSelector(state => state.properties)[review.property_id]
    const reviewUser = useSelector(state => state.users)[review?.user_id]
    const sessionUser = useSelector(state => state.session.user)
    const [editOpen, setEditOpen] = useState(false)

    return (
        <div id='single-review-display-full'>
            <div id='single-reivew-display-user-info-container'>
                <img alt='profile' id='single-review-profile-picture' src={reviewUser?.picture_url}></img>
                <p>{reviewUser?.name}</p>
            </div>
            <Rating fillColor={'rgb(227,28,95)'} ratingValue={review?.rating * 20} size={20} readonly={true}></Rating>
            <p>{review?.content}</p>
            {sessionUser?.id === review?.user_id && 
                <button onClick={()=> setEditOpen(!editOpen)} className='profile-edit-review-button' id='new-property-form-submit'>Edit Review</button>
            }
            {editOpen && <EditReview property={thisProperty} setReviewOpen={setEditOpen} review={review}/>}
        </div>
    )
}

export default SingleReivewDisplay
