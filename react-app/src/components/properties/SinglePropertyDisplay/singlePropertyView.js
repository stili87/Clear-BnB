import React from 'react'
import { useSelector } from 'react-redux';
import { useHistory, useParams} from 'react-router-dom';
import './single-property-display.css'

function SinglePropertyDisplay() {
    const propertyId = Number(useParams().id)
    const thisProperty = useSelector(state => state.properties)[propertyId]
    const sessionUser = useSelector(state => state.session.user)
    const history = useHistory()

    

    if(!thisProperty) {
        history.push('/404')
    }

    const handleEdit = () => {
        history.push(`/properties/1/edit`)
    }

    return (
        <div id='single-property-display-full'>{thisProperty?.title}
            {sessionUser?.id === thisProperty?.user_id && <button onClick={()=> handleEdit()}>Edit Button</button>}
        </div>
    )
}

export default SinglePropertyDisplay
