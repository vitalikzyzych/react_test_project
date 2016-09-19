import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'reducers';

export default function configureStore(initialState) {

  const store = applyMiddleware(thunk)(createStore)(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('reducers', () => {
      const nextRootReducer = require('reducers');
      store.replaceReducer(nextRootReducer.default);
    });
  }

  return store;
}
