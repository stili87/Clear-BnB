import React, { useState } from 'react'
import './create-review.css'
import { Rating } from 'react-simple-star-rating'
import { addReviewThunk } from '../../store/reviews'
import { useDispatch, useSelector } from 'react-redux'

function CreateReview({property, setReviewOpen}) {
    const [rating, setRating] = useState(60)
    const [content, setContent] = useState('')
    const sessionUser = useSelector(state => state.session.user)
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()


    const handleRating = (rate) => {
        setRating(rate)
      }

    const handleOnSubmit = async e => {
        e.preventDefault()

        const newReview = {
            rating: rating/20,
            content,
            property_id: property.id,
            user_id: sessionUser?.id
        }
        
        const data = await dispatch(addReviewThunk(newReview))
        if (data) {
            setErrors(data)
        } else {
            setReviewOpen(false)
        }



    }

    const handleCancel = e => {
        e.preventDefault()
        setReviewOpen(false)
    }

    return(

        <form id='create-review-full' onSubmit={e=>handleOnSubmit(e)}>
            {errors?.length > 0 &&
                    <ul id='property-creation-errors-container'>
                        <p id="property-creation-errors-header">Please fix the following errors:</p>
                        {errors?.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                }
            <p id='create-review-header'>Leave a Review for {property?.title}</p>
            <div id='create-review-rating-container'>

            <img src={sessionUser.picture_url} alt='profile' id='create-review-profile-pic'></img>
            <p id='create-review-sub-heads'>Rating:</p>
            <Rating onClick={handleRating} fillColor={'rgb(227,28,95)'} ratingValue={rating} size={30} initialValue={20} />
            </div>
            <p id='create-review-sub-heads'>Review:</p>
            <textarea onChange={e=> setContent(e.target.value)} value={content} id='create-review-text-area'></textarea>
            <button id='booking-submit-button'>Submit Review</button>
            <button onClick={e=> handleCancel(e)} id='booking-submit-button'>Cancel</button>
        </form>
    )
}

export default CreateReview
