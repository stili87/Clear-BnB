import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import BookingsMain from '../../bookings/bookingsMain';
import CreateReview from '../../reivews/createReview';
import SingleReivewDisplay from '../../reivews/singleReview';
import { Rating } from 'react-simple-star-rating';
import './single-property-display.css'
import Maps from '../../map/maps';

function SinglePropertyDisplay() {
    const propertyId = Number(useParams().id)
    const thisProperty = useSelector(state => state.properties)[propertyId]
    const sessionUser = useSelector(state => state.session.user)
    const history = useHistory()
    const owner = useSelector(state => state.users)[thisProperty?.user_id]
    const allReviews = Object.values(useSelector(state => state.reviews))
    const [reviewOpen, setReviewOpen] = useState(false)
    const allThisReviews = allReviews?.filter(review => review.property_id === propertyId)
    const thisReivews = allThisReviews?.reverse()

    const key = useSelector((state) => state.map.key);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const findAvgRating = () => {
        let sum = 0
        allThisReviews?.forEach(review => sum += review?.rating)
        return Math.floor(sum / allThisReviews?.length)
    }

    let avgRating = findAvgRating()


    if (!thisProperty) {
        history.push('/404')
    }

    const handleEdit = () => {
        history.push(`/properties/${propertyId}/edit`)
    }

    return (
        <div id='single-property-display-full'>
            <div id='single-property-display-header'>
                <h1 id='single-property-title'>{thisProperty?.title}</h1>
                <div id='single-property-2nd'>
                    <h2 id='single-property-location'>{thisProperty?.city}, {thisProperty?.state}</h2>
                </div>
                {allThisReviews.length > 0 ? <p>Rated: <Rating readonly={true} size={20} ratingValue={avgRating * 20} fillColor={'rgb(227,28,95)'}></Rating></p> : <p>New Property</p>}
            <p id='single-property-maps-header'>Where you will be:</p>
            </div>
            <div id='single-property-display-photos'>
                <img alt='main' id='single-property-main-img' src={thisProperty?.photo1_url} />
                <div id='single-property-extra-photos'>
                    {thisProperty?.photo2_url && <img id='single-property-secondary-img' alt='extra' src={thisProperty?.photo2_url} />}
                    {thisProperty?.photo3_url && <img id='single-property-secondary-img' alt='extra' src={thisProperty?.photo3_url} />}
                </div>
                <div id='single-property-maps'>
                    <Maps property={thisProperty} apiKey={key} />
                </div>
            </div>
            {sessionUser?.id === thisProperty?.user_id && <button id='single-property-edit-button' onClick={() => handleEdit()}>Edit this Property</button>}
            <div id='single-property-under-photos'>
                <div id='single-property-information'>
                    <div id='single-property-info-host'>
                        <div id='single-property-info-host-left'>
                            <p id='single-property-owner-name'>Hosted by {owner?.name}</p>
                            <p id='single-property-info-details'>{thisProperty?.guests} guests - {thisProperty?.bedrooms} bedrooms - {thisProperty?.bathrooms} bathrooms</p>

                        </div>
                        <img alt='owner' id='single-property-owner-img' src={owner?.picture_url}></img>
                    </div>
                    <div id='single-property-types'>
                        <p id='single-property-owner-name'>Property Types</p>
                        <div id='single-property-type-list'>
                            {thisProperty?.types.map(type => <p key={type.id}>{type.type}</p>)}
                        </div>
                    </div>
                    <div id='single-property-description'>
                        <p id='single-property-owner-name'>
                            Property Description
                        </p>
                        <p>
                            {thisProperty?.description}
                        </p>
                    </div>
                    <div id='single-property-types'>
                        <p id='single-property-owner-name'>Property Amenities</p>
                        <div id='single-property-type-list'>
                            {thisProperty?.amenities.map(type => <p key={type.id}>{type.type}</p>)}
                        </div>
                    </div>
                </div>
                <BookingsMain thisProperty={thisProperty} />
            </div>
            <div id='single-property-reviews-full'>
                <h2 id='single-property-reviews-header'>Latest Reviews</h2>
                <div id='single-property-create-review-container'>
                    <button id='booking-submit-button' onClick={() => setReviewOpen(!reviewOpen)}>Click Here to leave a review</button>
                    {reviewOpen && <CreateReview setReviewOpen={setReviewOpen} property={thisProperty} />}
                    {thisReivews?.length < 1 && <p id='single-property-review-no'>No reivews for this property yet</p>}
                </div>
                <div id='single-property-reviews-all'>
                    {thisReivews?.map(review => <SingleReivewDisplay key={review.id} review={review} />)}
                </div>
            </div>

        </div>
    )
}

export default SinglePropertyDisplay
