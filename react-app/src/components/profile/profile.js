import React, {useEffect} from 'react'
import { useSelector } from 'react-redux';
import './profile.css'
import { Link, useHistory, useParams } from 'react-router-dom';
import ProfileReview from './profileReview';



function Profile() {
    const userId = Number(useParams().id)
    const thisUser = useSelector(state => state.users)[userId]
    const sessionUser = useSelector(state => state.session.user)
    const allReviews = Object.values(useSelector(state => state.reviews))
    const userReviews = allReviews.filter(review => review.user_id === Number(userId))?.reverse()
    const history = useHistory()

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    if (!thisUser){
        history.push('/404')
    }

    return (
        <div id='profile-full-container'>
            <div id='profile-user-info-container'>
                <div id='profile-img-container'>
                    <img id='profile-img' alt='profile-pic' src={thisUser?.picture_url}></img>
                    <div id='profile-links-container'>
                        {userId === sessionUser?.id && <Link id='profile-link' to='/mytrips'>My Trips</Link>}
                        {userId === sessionUser?.id && <Link id='profile-link' to='/myproperties'>My Properties</Link>}
                    </div>
                </div>
                <div id='profile-user-info-right'>
                    <h1 id='profile-page-name'>Hi, I'm {thisUser?.name}</h1>
                    <h2 id='profile-page-location'>{thisUser?.location}</h2>
                    <h1 id='profile-page-bio'>{thisUser?.bio}</h1>
                    <div id='profile-reviews-by-user'>
                        <p id='profile-reviews-header'>Reviews by {thisUser?.name}</p>
                        {userReviews?.length < 1 && <p>No Reviews by this user yet.</p>}
                        {userReviews?.map(review => <ProfileReview key={review.id} review={review}></ProfileReview>)}
                    </div>
                    {}

                </div>
            </div>


        </div>
    )
}

export default Profile
