import React, { useEffect } from "react";
import { useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import HomeSingleProperty from "../homePage/homeSingleProperty";


const SearchPage = () => {
    const allProperties = Object.values(useSelector(state => state.properties)).reverse()
    const terms = useParams().terms
    console.log(terms)
    const properties = allProperties.filter(prop => {
        const propTypes = Object.values(prop.types)
        for(let i = 0; i < propTypes.length; i++){
            if(propTypes[i].type.toLowerCase() === terms) return true
            if(terms === 'tinyhomes' && propTypes[i].type === 'Tiny Homes') return true
        }
        if(prop.title.toLowerCase().includes(terms)) return true
        return false
    })


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div id="home-page-full-display">
            <p id="search-header">Search Results for {terms}:</p>
            <div id="home-page-property-display-container">
                {properties.length < 1 && <p id="search-not-found">No Properties Matching: {terms} </p>}
                {properties?.map(property => <HomeSingleProperty key={property.id} property={property} />)}
            </div>
        </div>
    )
}

export default SearchPage;
