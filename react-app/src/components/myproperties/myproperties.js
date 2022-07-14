import React from 'react'
import { useSelector } from 'react-redux';
import MyProperty from './individualProperty';

function MyProperties() {
    const sessionUser = useSelector(state => state.session.user)
    const allProperties = Object.values(useSelector(state => state.properties))
    const myProperties = allProperties?.filter(property => property?.user_id === sessionUser?.id).reverse()


    return (
        <div id='my-trips-full-container'>
            <h1 id='my-trips-header'>All of {sessionUser.name}'s Properties</h1>
            <div id='my-trips-multiple-container'>
            {myProperties?.length < 1 && <p>{sessionUser.name} has no Properties</p>}
            {myProperties?.map(property => <MyProperty key={property.id} property={property} />)}

            </div>
        </div>
    )
}


export default MyProperties
