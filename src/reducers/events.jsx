import { ActionTypes } from 'constants/AppConstants'
import { UPDATE_PATH } from 'redux-simple-router'
const defaultState = {
  events  : [],
  event_uuid : 'd64f7f68-fa0a-461a-9061-dac1ba041c9b',
  sessions_cache : [],
}

function loadEvents(state, events) {
  return {
    ...state,
    events
  }
}

function updateUuid(state, event_uuid) {
  return {
    ...state,
    event_uuid
  }
}

function updateSessionsCache(state, sessions_cache) {
  return {
    ...state,
    sessions_cache
  }
}


export default function events(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.FETCH_RESULTS          : return loadEvents(state, action.payload)
    case ActionTypes.UPDATE_EVENT_UUID      : return updateUuid(state, action.payload)
    case ActionTypes.UPDATE_SESSIONS_CACHE  : return updateSessionsCache(state, action.payload)
    default                                 : return state
  }
}
