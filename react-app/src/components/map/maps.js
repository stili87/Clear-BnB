import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
    width: '400px',
    height: '418px',
    borderRadius: '25px'
};


const Maps = ({ apiKey, property }) => {
    const [selectedMarker, setSelectedMarker] = useState(false)

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })


    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey,
    });

    const center = {
        lat: property?.lat,
        lng: property?.lng,
    };
    return (
        <>
            {isLoaded && (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={15}
                >
                    <Marker
                        position={{ lat: parseFloat(property?.lat), lng: parseFloat(property?.lng) }}
                        onClick={() => setSelectedMarker(!selectedMarker)}
                    >
                        {(selectedMarker && property?.id) ? (
                            <InfoWindow>
                                <div id='single-property-map-marker-display'>
                                    <p>{property?.title}</p>
                                    <p>{formatter.format(property?.price)} per night</p>
                                </div>
                            </InfoWindow>
                        ) : null}
                    </Marker>
                </GoogleMap>
            )}
        </>
    );
};

export default React.memo(Maps);
