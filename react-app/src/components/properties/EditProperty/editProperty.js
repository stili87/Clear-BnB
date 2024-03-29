import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import Multiselect from "multiselect-react-dropdown";
import { deletePropertyThunk, editPropertyThunk } from '../../../store/properties';
import { Modal } from '../../../context/Modal';
import LoadingModal from '../../loadingModal/loadingModal';
import mainLogo from '../../images/clearbnb-logos_transparent.png'

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
    const [showModal, setShowModal] = useState(false);
    const [showCreatedModal, setShowCreatedModal] = useState(false)

    if (thisProperty?.user_id !== sessionUser.id) {
        history.push('/404')
    }

    if (!thisProperty) {
        history.push('/404')
    }

    const handleOnSubmit = async e => {
        e.preventDefault()
        setShowModal(true)


        //Generating Lat and Lng based on address using api
        const longLat = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${address} ${city} ${state} ${zipcode}&key=f76162da63df4d15a25fcdc22b5b35a4&language=en&pretty=1&abbrv=1&limit=1`)
        const res = await longLat.json()
        let lat = 0
        let lng = 0
        if (res.results && res.results[0] && res.results[0].geometry) {
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
            setShowModal(false)
            setErrors(data)
        } else {
            setShowModal(false)
            setShowCreatedModal(true)
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
        if (bedrooms === 1) {
            return
        }
        setBedrooms(bedrooms - 1)
    }

    const addBathrooms = () => {
        setBathrooms(bathrooms + 1)
    }

    const removeBathrooms = () => {
        if (bathrooms === 1) {
            return
        }
        setBathrooms(bathrooms - 1)
    }

    const addGuests = () => {
        setGuests(guests + 1)
    }

    const removeGuests = () => {
        if (guests === 1) {
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
                    <ul id='property-creation-errors-container'>
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
                        min="1.00"
                        step="1.00"
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
                        step="1.00"
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
                    <label id='cursor-pointer'>{!photo1_url ? 'Upload Main Property Photo (required)' : "Uploaded"}
                        <input
                            className='pfp'
                            name='photo1_url'
                            accept="image/*"
                            onChange={updateImage1}
                            type='file'
                        ></input>
                    </label>
                </div>
                <label >Second Photo (optional):</label>
                <div className='custom-file-upload' id='cursor-pointer'>
                    <label id='cursor-pointer'>{!photo2_url ? 'Second Property Photo (optional)' : "Uploaded"}
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
                    <label id='cursor-pointer'>{!photo3_url ? 'Third Property Photo (optional)' : "Uploaded"}
                        <input
                            className='pfp'
                            name='photo3_url'
                            accept="image/*"
                            onChange={updateImage3}
                            type='file'
                        ></input>
                    </label>
                </div>
                <div id='property-creation-item-containter-multi'>
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
                <div id='property-creation-item-containter-multi'>
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
                    <button id="booking-submit-button" type="submit">{errors?.length > 0 ? 'Fix Errors and try again' : "Submit"}</button>
                    <button id="booking-submit-button" type="cancel" onClick={(e) => {
                        e.preventDefault()
                        history.push('/home')
                    }}>Cancel</button>
                    <button id="booking-submit-button" onClick={(e) => handleDeleteOpen(e)}>Delete Property</button>
                </div>
                {deleteOpen &&
                    <Modal>
                        <div id='new-property-delete-confirm-container'>
                        <img alt='logo' src={mainLogo} id='created-modal-logo'></img>
                            <p>Are you sure you want to delete this property?</p>
                            <div id='new-property-delete-buttons-container'>
                                <button onClick={(e) => handleDelete(e)} id="booking-submit-button">Confirm Delete</button>
                                <button onClick={e => handleDeleteCancel(e)} id="booking-submit-button">Cancel</button>
                            </div>
                        </div>
                    </Modal>
                }
            </form>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoadingModal />
                </Modal>
            )}
            {showCreatedModal &&
                <Modal>
                    <div id='property-created-modal-container'>
                        <img alt='logo' src={mainLogo} id='created-modal-logo'></img>
                        <p id='created-modal-title'> {title} Sucessfully Updated!</p>
                        <button id='booking-submit-button' onClick={() => {

                            history.push('/myproperties')
                        }}>Continue to My Properties</button>
                    </div>
                </Modal>

            }
        </div>
    )
}

export default EditProperty
