import React from 'react'
import { IndexRoute, Route, Router, browserHistory } from 'react-router'
import App        from 'components/App'
import Events       from 'views/Events'
import EventDetail  from 'views/EventDetails'

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Events} />
		<Route path="events/:eventId" component={EventDetail} />
	</Route>
);
