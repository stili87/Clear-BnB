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



function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(getPropertiesThunk())
      await dispatch(getAmenitiesThunk())
      await dispatch(getTypesThunk())
      await dispatch(getBookingsThunk())
      await dispatch(getUsersThunk())
      await dispatch(getReviewsThunk())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <div id='content-wrap'>
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
        <Route>
          <h1>Page Not found</h1>
        </Route>
      </Switch>
    </BrowserRouter>
      </div>
  );
}

export default App;
