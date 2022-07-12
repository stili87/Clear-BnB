import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Rating } from 'react-simple-star-rating'
import './single-review.css'
import EditReview from './editReview'


function SingleReivewDisplay({ review }) {
    const reviewUser = useSelector(state => state.users)[review?.user_id]
    const [thisContent, setThisContent] = useState(review?.content || '')
    const sessionUser = useSelector(state => state.session.user)
    const [editOpen, setEditOpen] = useState(false)
    const thisProperty = useSelector(state => state.properties)[review.property_id]




    return (
        <div id='single-review-display-full'>
            <div id='single-reivew-display-user-info-container'>
                <img alt='profile' id='single-review-profile-picture' src={reviewUser?.picture_url}></img>
                <p>{reviewUser.name}</p>
            </div>
            <Rating ratingValue={review?.rating * 20} size={20} readonly={true}></Rating>
            <p>{thisContent}</p>

        </div>
    )
}

export default SingleReivewDisplay
