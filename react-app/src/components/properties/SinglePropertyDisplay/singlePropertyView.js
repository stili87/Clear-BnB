import React from 'react'
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import BookingsMain from '../../bookings/bookingsMain';
import './single-property-display.css'

function SinglePropertyDisplay() {
    const propertyId = Number(useParams().id)
    const thisProperty = useSelector(state => state.properties)[propertyId]
    const sessionUser = useSelector(state => state.session.user)
    const history = useHistory()
    const owner = useSelector(state => state.users)[thisProperty?.user_id]



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
            </div>
            <div id='single-property-display-photos'>
                <img alt='main' id='single-property-main-img' src={thisProperty?.photo1_url} />
                <div id='single-property-extra-photos'>
                    <img id='single-property-secondary-img' alt='extra' src={thisProperty?.photo2_url} />
                    <img id='single-property-secondary-img' alt='extra' src={thisProperty?.photo3_url} />
                </div>

            </div>
            {sessionUser?.id === thisProperty?.user_id && <button id='single-property-edit-button' onClick={() => handleEdit()}>Edit this Property</button>}
            <div id='single-property-under-photos'>
                <div id='single-property-information'>
                    <div id='single-property-info-host'>
                        <div id='single-property-info-host-left'>
                            <p id='single-property-owner-name'>Hosted by {owner.name}</p>
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
        </div>
    )
}

export default SinglePropertyDisplay
