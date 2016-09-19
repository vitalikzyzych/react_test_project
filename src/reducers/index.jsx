import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import { routerReducer } from 'react-router-redux'
import auth from 'reducers/auth'
import events from 'reducers/events'

export default combineReducers({
  auth,
  events,
  routing: routerReducer
});
