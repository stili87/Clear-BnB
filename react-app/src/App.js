import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/navbar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import HomePage from './components/homePage/homePage';
import { getPropertiesThunk } from './store/properties';
import NewProperty from './components/properties/NewProperty/newproperty';
import { getAmenitiesThunk } from './store/amenities';
import { getTypesThunk } from './store/types';
import SinglePropertyDisplay from './components/properties/SinglePropertyDisplay/singlePropertyView';
import EditProperty from './components/properties/EditProperty/editProperty';
import { getBookingsThunk } from './store/bookings';
import Profile from './components/profile/profile';
import BookingsEdit from './components/bookings/bookingsEdit';
import SplashPage from './components/splashPage/splashPage';
import { getUsersThunk } from './store/users';
import { getReviewsThunk } from './store/reviews';
import MyTrips from './components/mytrips/myTrips';
import MyProperties from './components/myproperties/myproperties';
import Footer from './components/footer/footer';
import { getKey } from './store/maps';
import LoadingModal from './components/loadingModal/loadingModal';
import { Modal } from './context/Modal';
import About from './components/about/about';
import SearchPage from './components/search/searchPage';



function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)
  const [showModal] = useState(true)

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(getPropertiesThunk())
      await dispatch(getAmenitiesThunk())
      await dispatch(getTypesThunk())
      await dispatch(getBookingsThunk())
      await dispatch(getUsersThunk())
      await dispatch(getReviewsThunk())
      await dispatch(getKey())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return (
      <>
      {showModal && 
        <Modal>
          <LoadingModal />
        </Modal>
      }
      </>
      )
  }

  return (
    <>
    <BrowserRouter>
      {sessionUser && <NavBar />}
      <Switch>
        <Route exact={true} path='/'>
          <SplashPage />
        </Route>
        <ProtectedRoute path='/properties/new' exact={true} >
          <NewProperty />
        </ProtectedRoute>
        <ProtectedRoute path='/properties/:id' exact={true}>
          <SinglePropertyDisplay />
        </ProtectedRoute>
        <ProtectedRoute path='/home' exact={true} >
          <HomePage />
        </ProtectedRoute>
        <ProtectedRoute path='/properties/:id/edit' exact={true} >
          <EditProperty />
        </ProtectedRoute>
        <ProtectedRoute path='/profile/:id' exact={true} >
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path='/bookings/:id/edit' exact={true} >
          <BookingsEdit />
        </ProtectedRoute>
        <ProtectedRoute path='/mytrips' exact={true}>
          <MyTrips />
        </ProtectedRoute>
        <ProtectedRoute path='/myproperties' exact={true}>
          <MyProperties />
        </ProtectedRoute>
        <ProtectedRoute path='/about'>
          <About />
        </ProtectedRoute>
        <ProtectedRoute path='/search/:terms'>
          <SearchPage />
        </ProtectedRoute>
        <ProtectedRoute>
          <h1 id='page-not-found'>Page Not Found</h1>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
    <Footer />
      </>
  );
}

export default App;
