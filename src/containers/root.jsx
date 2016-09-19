import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux'
import configureStore from 'stores/redux';
import routes from 'routes';
const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store)

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          {routes}
        </Router>
      </Provider>
    );
  }
}
