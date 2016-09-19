import { AppTypes } from 'constants/AppConstants'

const defaultState = {
  isAuth : false
};

function signIn (state) {
  return {
    ...state,
    isAuth: true
  };
}
function signOut (state) {
  return {
    ...state,
    isAuth: false
  };
}
function registration (state) {
  return {
    ...state,
    registration: true
  };
}

export default function auth (state = defaultState, action){
  switch (action.type) {
    case  AppTypes.SIGNIN       : return signIn(state)
    case  AppTypes.SIGNOUT      : return signOut(state)
    case  AppTypes.REGISTRATION : return registration(state)

  }

  return state
}
