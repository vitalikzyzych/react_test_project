import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom'
import Router from 'react-router';
import routes from 'routes';
import Root from 'containers/Root';
require('bootstrap');
render(<Root/>, document.getElementById('root'));
