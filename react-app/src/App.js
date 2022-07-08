import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import User from './components/User';
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


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      await dispatch(getPropertiesThunk())
      await dispatch(getAmenitiesThunk())
      await dispatch(getTypesThunk())
      await dispatch(getBookingsThunk())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact={true} path='/'>
          <h1>Splash page</h1>
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/properties/new' exact={true} >
          <NewProperty />
        </ProtectedRoute>
        <ProtectedRoute path='/properties/:id' exact={true}>
          <SinglePropertyDisplay />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/home' exact={true} >
          <HomePage />
        </ProtectedRoute>
        <ProtectedRoute path='/properties/:id/edit' exact={true} >
          <EditProperty />
        </ProtectedRoute>
        <ProtectedRoute path='/profile' exact={true} >
          <Profile />
        </ProtectedRoute>
        <Route>
          <h1>Page Not found</h1>
        </Route>
      </Switch>

    </BrowserRouter>
  );
}

export default App;
