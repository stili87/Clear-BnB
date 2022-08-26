import React from 'react'
import { NavLink } from 'react-router-dom'
import './filter-bar.css'
import { GiFarmTractor, GiFamilyHouse, GiGolfFlag } from 'react-icons/gi';
import { TbBuildingSkyscraper } from 'react-icons/tb';

const FilterBar = () => {


    return (
        <div id='filter-bar-full'>
            <NavLink id='filter-link-full' to='/search/beach'>
                <i className="fa-solid fa-umbrella-beach"></i>
                <p id='filter-text'>Beach</p>
            </NavLink>
            <NavLink id='filter-link-full' to='/search/city'>
                <i className="fa-solid fa-city"></i>
                <p id='filter-text'>City</p>
            </NavLink>
            <NavLink id='filter-link-full' to='/search/lakefront'>
                <i className="fas fa-water"></i>
                <p id='filter-text'>Lake Front</p>
            </NavLink>
            <NavLink id='filter-link-full' to='/search/house'>

                <GiFamilyHouse />
                <p id='filter-text'>House</p>
            </NavLink>
            <NavLink id='filter-link-full' to='/search/apartment'>
                <i className="fa fa-building-o" aria-hidden="true"></i>
                <p id='filter-text'>Apartment</p>
            </NavLink>
            <NavLink id='filter-link-full' to='/search/camping'>
                <i className="fas fa-campground"></i>
                <p id='filter-text'>Camping</p>
            </NavLink>
            <NavLink id='filter-link-full' to='/search/rural'>
                <GiFarmTractor />
                <p id='filter-text'>Rural</p>
            </NavLink>
            <NavLink id='filter-link-full' to='/search/tiny%20homes'>
                <i className="fa fa-home" aria-hidden="true"></i>
                <p id='filter-text'>Tiny Homes</p>
            </NavLink>
            <NavLink id='filter-link-full' to='/search/condo'>
                <TbBuildingSkyscraper />
                <p id='filter-text'>Condo</p>
            </NavLink>
            <NavLink id='filter-link-full' to='/search/golfing'>
                <GiGolfFlag />
                <p id='filter-text'>Golfing</p>
            </NavLink>
        </div>
    )
}

export default FilterBar
