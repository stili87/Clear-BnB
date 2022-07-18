import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import Multiselect from "multiselect-react-dropdown";
import './new-property.css'
import { addPropertyThunk } from '../../../store/properties';
import { Modal } from '../../../context/Modal';
import LoadingModal from '../../loadingModal/loadingModal';

const NewProperty = () => {
    const types = Object.values(useSelector(state => state.types))
    const amenities = Object.values(useSelector(state => state.amenities))
    const sessionUser = useSelector(state => state.session.user)
    const [errors, setErrors] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [price, setPrice] = useState('')
    const [service_fee, setService_fee] = useState('')
    const [bedrooms, setBedrooms] = useState(1)
    const [bathrooms, setBathrooms] = useState(1)
    const [guests, setGuests] = useState(1)
    const [photo1_url, setPhoto1_url] = useState(null)
    const [photo2_url, setPhoto2_url] = useState(null)
    const [photo3_url, setPhoto3_url] = useState(null)
    const [property_types, setProerty_types] = useState([])
    const [property_amenities, setProerty_amenities] = useState([])
    const history = useHistory()
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false);


    const handleOnSubmit = async e => {
        e.preventDefault()

        setShowModal(true)

        if (!photo1_url) {
            setErrors(['Main Property Photo Required'])
            setShowModal(false)
            return
        } else {
            setErrors([])
        }

        if (photo1_url &&
            !photo1_url.name.endsWith("png") &&
            !photo1_url.name.endsWith("jpg") &&
            !photo1_url.name.endsWith("jpeg") &&
            !photo1_url.name.endsWith("gif")
        ) {
            setErrors(['Only .png, .jpg, .jpeg, .gif file types allowed for main picture.'])
            setShowModal(false)
            return
        }

        if (photo2_url &&
            !photo2_url.name.endsWith("png") &&
            !photo2_url.name.endsWith("jpg") &&
            !photo2_url.name.endsWith("jpeg") &&
            !photo2_url.name.endsWith("gif")
        ) {
            setErrors(['Only .png, .jpg, .jpeg, .gif file types allowed for second picture.'])
            setShowModal(false)
            return
        }

        if (photo3_url &&
            !photo3_url.name.endsWith("png") &&
            !photo3_url.name.endsWith("jpg") &&
            !photo3_url.name.endsWith("jpeg") &&
            !photo3_url.name.endsWith("gif")
        ) {
            setErrors(['Only .png, .jpg, .jpeg, .gif file types allowed for third picture.'])
            setShowModal(false)
            return
        }

        //Generating Lat and Lng based on address
        const longLat = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${address} ${city} ${state} ${zipcode}&key=f76162da63df4d15a25fcdc22b5b35a4&language=en&pretty=1&abbrv=1&limit=1`)
        const res = await longLat.json()
        let lat = 0
        let lng = 0
        if (res.results && res.results[0] && res.results[0].geometry) {
            lat = res.results[0].geometry.lat
            lng = res.results[0].geometry.lng
        }
        const user_id = sessionUser.id

        const newProperty = {
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
            property_types, //array of type ids
            property_amenities,
            photo1_url,
            photo2_url,
            photo3_url
        }

        const data = await dispatch(addPropertyThunk(newProperty))
        if (data) {
            setErrors(data)
            setShowModal(false)
        } else {
            setShowModal(false)
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
            <h1 id='property-creation-header'> Add Your Property to Clear BnB </h1>
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
                    ></input>
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
                <label>Second Photo (optional):</label>
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
                <label >Third Photo (optional):</label>
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
                <div id='property-creation-item-containter'>

                    <label>Select Property Types*:</label>
                    <Multiselect
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
                    />
                </div>
                <div id='property-creation-button-container'>
                    <button id="new-property-form-submit" type="submit">{errors?.length > 0 ? 'Fix Errors and try again' : "Submit"}</button>
                    <button id="new-property-form-submit" type="cancel" onClick={(e) => {
                        e.preventDefault()
                        history.push('/home')
                    }}>Cancel</button>
                </div>
            </form>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoadingModal />
                </Modal>
            )}
        </div>
    )
}

export default NewProperty
