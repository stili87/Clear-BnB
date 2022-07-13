import React, { useEffect } from "react";
import { useSelector } from 'react-redux'
import HomeSingleProperty from "./homeSingleProperty";
import './home-page.css'

const HomePage = () => {
    const properties = Object.values(useSelector(state => state.properties))

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div id="home-page-full-display">
            <div id="home-page-property-display-container">
                {properties?.map(property => <HomeSingleProperty key={property.id} property={property} />)}
            </div>
        </div>
    )
}

export default HomePage;
