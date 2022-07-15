import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import propertyReducer from './properties';
import amenityReducer from './amenities';
import typesReducer from './types';
import bookingReducer from './bookings';
import usersReducer from './users';
import reviewsReducer from './reviews';
import map from './maps';


const rootReducer = combineReducers({
  session,
  properties: propertyReducer,
  amenities: amenityReducer,
  types: typesReducer,
  bookings: bookingReducer,
  users: usersReducer,
  reviews: reviewsReducer,
  map
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
