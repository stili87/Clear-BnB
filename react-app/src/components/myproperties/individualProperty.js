import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector} from 'react-redux'


function MyProperty({property}) {
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })

    const handleEditButton = () => {
        history.push(`/properties/${property.id}/edit`)
    }

    return (
        <div id='my-trips-single-booking-full'>
            <Link to={`/properties/${property?.id}`} ><img alt='property' id='my-trips-single-booking-prop-img' src={property?.photo1_url}></img></Link>
            <Link to={`/properties/${property?.id}`} id='my-trips-single-booking-prop-title'> {property?.title}</Link>
            <p id='my-trips-single-booking-dates'>{property?.address}</p>
            <p id='my-trips-single-booking-dates'>{property?.city}, {property?.state} {property?.zipcode}</p>
            <p id='my-trips-single-booking-cost'>Total Cost: {formatter.format(property.price)} per night</p>
            {sessionUser?.id === property.user_id && <button onClick={()=>handleEditButton()} id='my-trips-single-booking-edit-button'>Edit this Propery</button>}
        </div>
        )
        
}

export default MyProperty
