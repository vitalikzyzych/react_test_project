import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import auth from 'reducers/auth'
import events from 'reducers/events'

export default combineReducers({
  auth,
  events,
  routing: routerReducer
});
