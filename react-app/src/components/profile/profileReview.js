import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Rating } from 'react-simple-star-rating'
import EditReview from '../reivews/editReview';

function ProfileReview ({review}) {
    const thisProperty = useSelector(state => state.properties)[review.property_id]
    const sessionUser = useSelector(state => state.session.user)
    const [editOpen, setEditOpen] = useState(false)


    return (
        <div id='profile-reivew-full'>
            <div id='profile-review-property-info'>
            <img alt='profile' src={thisProperty.photo1_url} id='profile-review-property-picture'/>
            <p>{thisProperty.title}</p>
            </div>
            <Rating fillColor={'rgb(227,28,95)'} readonly={true} ratingValue={review?.rating * 20} size={15}></Rating>
            <p id='profile-review-content'>{review?.content}</p>
            {sessionUser.id === review.user_id && 
                <button onClick={()=> setEditOpen(!editOpen)} className='profile-edit-review-button' id='new-property-form-submit'>Edit Review</button>
            }
            {editOpen && <EditReview property={thisProperty} setReviewOpen={setEditOpen} review={review}/>}
        </div>
    )
}


export default ProfileReview
