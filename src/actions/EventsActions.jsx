import EventsApi from 'api/EventsApi'
import {ActionTypes} from 'constants/AppConstants'

export function loadEvents() {
  return EventsApi.getEventsFromApi()
}

export function saveAttendee(attendee, uuid, sessions) {
  let data = {
    "attendee": attendee,
    "uuid": uuid,
    "sessions": sessions,
  }
  EventsApi.saveAttendeeData(data)
}
export function modalOnSaveStatus(modalStatus){
  return {
    type: ActionTypes.MODAL_STATUS,
    payload: modalStatus
  }
}

export function saveUser(user) {

  return {
    type: ActionTypes.SAVE_USER,
    payload: user
  }
}

export function load() {
  return {
    type: ActionTypes.FETCH_RESULTS,
    payload: loadEvents(),
  }
}

export function updateUuid(event_uuid) {

  return {
    type: ActionTypes.UPDATE_EVENT_UUID,
    payload: event_uuid,
  }
}
export function setToken(token){

  return {
    type: ActionTypes.TOKEN,
    payload: token,
  }

}
export function setProfile(profile){
  return {
    type: ActionTypes.PROFILE_FROM_AUTH0,
    payload: profile,
  }
}
export function updateSessionsCache(sessions_cache) {
  return {
    type: ActionTypes.UPDATE_SESSIONS_CACHE,
    payload: sessions_cache,
  }
}
