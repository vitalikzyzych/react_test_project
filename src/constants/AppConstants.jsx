import keyMirror from 'keymirror'

const ActionTypes = keyMirror({
	  INFO: null,
	  PROFILE: null,
	  INCREMENT: null,
	  INITIALIZE: null,
		FETCH_RESULTS: null,
		UPDATE_EVENT_UUID: null,
		UPDATE_SESSIONS_CACHE: null,
	});
const AppTypes = keyMirror(
	{ SIGNIN: null,
	  SIGNOUT: null,
	  REGISTRATION: null,
	}
	);
const BASE_URL = 'http://localhost:8081'
export {
  ActionTypes,
  AppTypes,
  BASE_URL
}
