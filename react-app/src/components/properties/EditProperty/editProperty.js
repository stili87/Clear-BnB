import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import Multiselect from "multiselect-react-dropdown";
import { deletePropertyThunk, editPropertyThunk } from '../../../store/properties';

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
    const [deleteOpen, setDeleteOpen] = useState(false)
    const dispatch = useDispatch()

    if(thisProperty?.user_id !== sessionUser.id){
        history.push('/')
    }

    if(!thisProperty){
        history.push('/')
    }
    
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

        const data = await dispatch(editPropertyThunk(editProperty))
        if (data) {
            setErrors(data)
        }else {
            history.push('/myproperties')
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

    const handleDeleteOpen = (e) => {
        e.preventDefault()
        setDeleteOpen(!deleteOpen)
    }

    const handleDeleteCancel = (e) => {
        e.preventDefault()
        setDeleteOpen(!deleteOpen)
    }

    const handleDelete = async e => {
        e.preventDefault()
        await dispatch(deletePropertyThunk(propertyId))
        history.push('/myproperties')
    }

    const addBedRooms = () => {
        setBedrooms(bedrooms + 1)
    }

    const removeBedRooms = () => {
        if(bedrooms === 1 ){
            return
        }
        setBedrooms(bedrooms - 1)
    }

    const addBathrooms = () => {
        setBathrooms(bathrooms + 1)
    }

    const removeBathrooms = () => {
        if(bathrooms === 1 ){
            return
        }
        setBathrooms(bathrooms - 1)
    }

    const addGuests = () => {
        setGuests(guests + 1)
    }

    const removeGuests = () => {
        if(guests === 1 ){
            return
        }
        setGuests(guests - 1)
    }

    return (
        <div id='property-creation-container'>
            <h1 id='property-creation-header'> Edit Property {thisProperty?.title} </h1>
            <form id='property-new-form' onSubmit={e => handleOnSubmit(e)}>
                <p>*required</p>
                {errors?.length > 0 &&
                    <ul>
                        <p id="property-creation-errors-header">Please fix the following errors:</p>
                        {errors?.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                }
                <div id='property-creation-item-containter'>

                    <label>Property Title*:</label>
                    <input
                        name='title'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        type='text'
                        placeholder='e.g. A cozy bungalo close to the stadium'
                    />
                </div>
                <div id='property-creation-item-containter'>

                    <label>Description*:</label>
                    <textarea
                        resize='none'
                        name='description'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        type='text'
                        placeholder='Property Description'
                    />
                </div>
                <div id='property-creation-item-containter'>

                    <label>Address*:</label>
                    <input
                        name='address'
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        type='text'
                        placeholder='e.g. 123 Main St.'
                    />
                </div>
                <div id='property-creation-item-containter'>

                    <label>City*:</label>
                    <input
                        name='city'
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        type='text'
                        placeholder='e.g. St. Louis'
                    />
                </div>
                <div id='property-creation-item-containter'>

                    <label>State*:</label>
                    <input
                        name='state'
                        value={state}
                        onChange={e => setState(e.target.value)}
                        type='text'
                        placeholder='e.g. Missouri'
                    />
                </div>
                <div id='property-creation-item-containter'>

                    <label>Zipcode*:</label>
                    <input
                        name='zipcode'
                        value={zipcode}
                        onChange={e => setZipcode(e.target.value)}
                        type='text'
                        placeholder='e.g. 63128'
                    />
                </div>
                <div id='property-creation-item-containter'>
                    <label>Cost per Night*:</label>
                    <input
                        name='price'
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        type="number"
                        min="0.01"
                        step="0.01"
                        placeholder='e.g. $100.50'
                    />
                </div>
                <div id='property-creation-item-containter'>
                    <label>Service Fee*:</label>
                    <input
                        name='serviceFee'
                        value={service_fee}
                        onChange={e => setService_fee(e.target.value)}
                        type="number"
                        min="0.00"
                        step="0.01"
                        placeholder='e.g. $25.49'
                    />
                </div>
                <div id='property-creation-item-containter'>
                    <label>Bedrooms*:</label>
                <div id='bookings-guests-selection' className='property-creation-buttons'>
                    <p id='bookings-guests-selection-selector' onClick={() => removeBedRooms()}>-</p>
                    <p id='bookings-guests-selection-number'>{bedrooms}</p>
                    <p id='bookings-guests-selection-selector' onClick={() => addBedRooms()}>+</p>
                </div>
                </div>
                <div id='property-creation-item-containter' >
                    <label>Bathrooms*:</label>
                    <div id='bookings-guests-selection' className='property-creation-buttons'>
                    <p id='bookings-guests-selection-selector' onClick={() => removeBathrooms()}>-</p>
                    <p id='bookings-guests-selection-number'>{bathrooms}</p>
                    <p id='bookings-guests-selection-selector' onClick={() => addBathrooms()}>+</p>
                </div>
                </div>
                <div id='property-creation-item-containter'>
                    <label>Guests Allowed*:</label>
                    <div id='bookings-guests-selection' className='property-creation-buttons'>
                    <p id='bookings-guests-selection-selector' onClick={() => removeGuests()}>-</p>
                    <p id='bookings-guests-selection-number'>{guests}</p>
                    <p id='bookings-guests-selection-selector' onClick={() => addGuests()}>+</p>
                </div>
                </div>
                <label>Main Photo (required):</label>
                <div className='custom-file-upload' id='cursor-pointer'>
                <label>{!photo1_url ? 'Upload Main Property Photo (required)' : "Uploaded"}
                <input
                    className='pfp'
                    name='photo1_url'
                    accept="image/*"
                    onChange={updateImage1}
                    type='file'
                ></input>
                </label>
                </div>
                <label>Second Photo (optional):</label>
                <div className='custom-file-upload' id='cursor-pointer'>
                <label>{!photo2_url ? 'Second Property Photo (optional)' : "Uploaded"}
                <input
                    className='pfp'
                    name='photo2_url'
                    accept="image/*"
                    onChange={updateImage2}
                    type='file'
                ></input>
                </label>
                </div>
                <label>Third Photo (optional):</label>
                <div className='custom-file-upload' id='cursor-pointer'>
                <label>{!photo3_url ? 'Third Property Photo (optional)' : "Uploaded"}
                <input
                    className='pfp'
                    name='photo3_url'
                    accept="image/*"
                    onChange={updateImage3}
                    type='file'
                ></input>
                </label>
                </div>
                <div id='property-creation-item-containter'>
                    <label>Select Property Types*:</label>
                    <Multiselect
                        selectedValues={thisProperty?.types}
                        id="property-creation-multi"
                        options={types}
                        onSelect={onSelectTypes}
                        onRemove={onSelectTypes}
                        displayValue="type"
                        showCheckbox={true}
                        placeholder={'Property Types'}
                    />
                </div>
                <div id='property-creation-item-containter'>

                    <label>Select Property Amenities*:</label>
                    <Multiselect
                        id="property-creation-multi"
                        options={amenities}
                        onSelect={onSelectAmenities}
                        onRemove={onSelectAmenities}
                        displayValue="type"
                        showCheckbox={true}
                        placeholder={'Property Amenities'}
                        selectedValues={thisProperty?.amenities}
                    />
                </div>
                <div id='property-creation-button-container'>
                <button  id="new-property-form-submit" type="submit">{errors?.length > 0 ? 'Fix Errors and try again': "Submit"}</button>
                    <button id="new-property-form-submit" type="cancel" onClick={(e) => {
                        e.preventDefault()
                        history.push('/home')
                    }}>Cancel</button>
                    <button id="new-property-form-submit" onClick={(e)=>handleDeleteOpen(e)}>Delete Property</button>
                </div>
            {deleteOpen && <div id='new-property-delete-confirm-container'>
                 <p>Are you sure you want to delete this property?</p>
                 <div id='new-property-delete-buttons-container'>
                 <button onClick={(e)=>handleDelete(e)} id="new-property-form-submit">Confirm Delete</button>
                 <button onClick={e=> handleDeleteCancel(e)} id="new-property-form-submit">Cancel</button>
                 </div>
                 </div>}
            </form>
        </div>
    )
}

export default EditProperty
