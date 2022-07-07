import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import Multiselect from "multiselect-react-dropdown";
import { editPropertyThunk } from '../../../store/properties';

const EditProperty = () => {
    const propertyId = useParams().id
    const thisProperty = useSelector(state => state.properties)[propertyId]

    const types = Object.values(useSelector(state => state.types))
    const amenities = Object.values(useSelector(state => state.amenities))
    const sessionUser = useSelector(state => state.session.user)
    const [errors, setErrors] = useState([])
    const [title, setTitle] = useState(thisProperty?.title || '')
    const [description, setDescription] = useState(thisProperty?.description || '')
    const [address, setAddress] = useState(thisProperty?.address || '')
    const [city, setCity] = useState(thisProperty?.city || '')
    const [state, setState] = useState(thisProperty?.state || '')
    const [zipcode, setZipcode] = useState(thisProperty?.zipcode || '')
    const [price, setPrice] = useState(thisProperty?.price || '')
    const [service_fee, setService_fee] = useState(thisProperty?.service_fee || '')
    const [bedrooms, setBedrooms] = useState(thisProperty?.bedrooms || '')
    const [bathrooms, setBathrooms] = useState(thisProperty?.bathrooms || '')
    const [guests, setGuests] = useState(thisProperty?.guests || '')
    const [photo1_url, setPhoto1_url] = useState(thisProperty?.photo1_url || null)
    const [photo2_url, setPhoto2_url] = useState(thisProperty?.photo2_url || null)
    const [photo3_url, setPhoto3_url] = useState(thisProperty?.photo3_url || null)
    const [property_types, setProerty_types] = useState(thisProperty?.types.map(type => type.id) || [])
    const [property_amenities, setProerty_amenities] = useState(thisProperty?.amenities.map(amenity => amenity.id) || [])
    const history = useHistory()
    const dispatch = useDispatch()


    const handleOnSubmit = async e => {
        e.preventDefault()

        //Generating Lat and Lng based on address using api
        const longLat = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${address} ${city} ${state} ${zipcode}&key=f76162da63df4d15a25fcdc22b5b35a4&language=en&pretty=1&abbrv=1&limit=1`)
        const res = await longLat.json()
        let lat = 0
        let lng = 0
        if (res.results && res.results[0] && res.results[0].geometry){
            lat = res.results[0].geometry.lat
            lng = res.results[0].geometry.lng
        }
        const user_id = sessionUser.id
        
        const editProperty = {
            propertyId: thisProperty?.id,
            title,
            description,
            address,
            city,
            state,
            zipcode,
            lat,
            lng,
            price,
            service_fee,
            bedrooms,
            bathrooms,
            guests,
            user_id,
            property_types,
            property_amenities,
            photo1_url,
            photo2_url,
            photo3_url
        }

        console.log(property_types)

        const data = await dispatch(editPropertyThunk(editProperty))
        if (data) {
            setErrors(data)
        }else {
            history.push('/home')
        }
    }


    const updateImage1 = (e) => {
        const file = e.target.files[0];
        setPhoto1_url(file);
    }

    const updateImage2 = (e) => {
        const file = e.target.files[0];
        setPhoto2_url(file);
    }

    const updateImage3 = (e) => {
        const file = e.target.files[0];
        setPhoto3_url(file);
    }


    const onSelectAmenities = (selectedList, selectedItem) => {
        const idList = selectedList.map(item => item.id)
        setProerty_amenities(idList)
    }

    const onSelectTypes = (selectedList, selectedItem) => {
        const idList = selectedList.map(item => item.id)
        setProerty_types(idList)
    }

    return (
        <div id='property-creation-container'>
            <h1 id='property-creation-header'> Edit Property {thisProperty.title} </h1>
            <form id='property-new-form' onSubmit={e => handleOnSubmit(e)}>
                {errors.length > 0 &&
                    <ul>
                        <p id="property-creation-errors-header">Please fix the following errors:</p>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                }
                <label>Property Title</label>
                <input
                    name='title'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    type='text'
                    placeholder='e.g. A cozy bungalo close to the stadium'
                />
                <label>Description</label>
                <textarea
                    resize='none'
                    name='description'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    type='text'
                    placeholder='Property Description'
                />
                <label>Address</label>
                <input
                    name='address'
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    type='text'
                    placeholder='e.g. 123 Main St.'
                />
                <label>City</label>
                <input
                    name='city'
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    type='text'
                    placeholder='e.g. St. Louis'
                />
                <label>State</label>
                <input
                    name='state'
                    value={state}
                    onChange={e => setState(e.target.value)}
                    type='text'
                    placeholder='e.g. Missouri'
                />
                <label>Zipcode</label>
                <input
                    name='zipcode'
                    value={zipcode}
                    onChange={e => setZipcode(e.target.value)}
                    type='text'
                    placeholder='e.g. 63128'
                />
                <label>Cost per Night</label>
                <input
                    name='price'
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    type="number"
                    min="0.01"
                    step="0.01"
                    placeholder='e.g. $100.50'
                />
                <label>Service Fee</label>
                <input
                    name='serviceFee'
                    value={service_fee}
                    onChange={e => setService_fee(e.target.value)}
                    type="number"
                    min="0.00"
                    step="0.01"
                    placeholder='e.g. $25.49'
                />
                <label>Bedrooms</label>
                <input
                    name='bedrooms'
                    value={bedrooms}
                    onChange={e => setBedrooms(e.target.value)}
                    type="number"
                    min="0"
                    step="1"
                    placeholder='e.g. 4'
                />
                <label>Bathrooms</label>
                <input
                    name='bathrooms'
                    value={bathrooms}
                    onChange={e => setBathrooms(e.target.value)}
                    type="number"
                    min="0"
                    step="1"
                    placeholder='e.g. 2'
                />
                <label>Guests Allowed</label>
                <input
                    name='guests'
                    value={guests}
                    onChange={e => setGuests(e.target.value)}
                    type="number"
                    min="0"
                    step="1"
                    placeholder='e.g. 7'
                />
                <label>Main Property Photo</label>
                <input
                    name='photo1_url'
                    accept="image/*"
                    onChange={updateImage1}
                    type='file'
                ></input>
                <label>Second Property Photo</label>
                <input
                    name='photo2_url'
                    accept="image/*"
                    onChange={updateImage2}
                    type='file'
                ></input>
                <label>Third Property Photo</label>
                <input
                    name='photo3_url'
                    accept="image/*"
                    onChange={updateImage3}
                    type='file'
                ></input>
                <label>Select Property Types</label>
                <Multiselect
                    selectedValues={thisProperty?.types}
                    id="property-creation-multi"
                    options={types}
                    onSelect={onSelectTypes}
                    onRemove={onSelectTypes}
                    displayValue="type"
                    showCheckbox={true}
                    placeholder={'Click Here to Select Property Types'}
                />
                <label>Select Property Amenities</label>
                <Multiselect
                    selectedValues={thisProperty?.amenities}
                    id="property-creation-multi"
                    options={amenities}
                    onSelect={onSelectAmenities}
                    onRemove={onSelectAmenities}
                    displayValue="type"
                    showCheckbox={true}
                    placeholder={'Click Here to Select Property Amenities'}
                />
                <button id="new-property-form-submit" type="submit">Submit</button>
                <button id="new-property-form-submit" type="cancel" onClick={(e)=> {
                    e.preventDefault()
                    history.push('/home')
                    }}>Cancel</button>
            </form>
        </div>
    )
}

export default EditProperty
