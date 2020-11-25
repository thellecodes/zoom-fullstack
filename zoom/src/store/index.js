import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
const middleware = [thunk];

/* Reducer root */
import rootReducer from './reducer';

const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware),
);

export default store;
