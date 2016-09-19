import React, {Component} from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'
import * as EventsActions  from 'actions/EventsActions'
import EventItem from 'components/events/EventItem'

class Events extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.dispatch(EventsActions.load())
  }

  _getEvents(events) {
    var eventsList = _.map(events, (item, i) => {
      if (item.status !== "Draft") {
        return (
          <EventItem
            item={item}
            key={i}
          />
        )
      }
    })
    return eventsList
  }

  render() {
    var eventsList = this._getEvents(this.props.events)
    return (
      <div className="events">
        {eventsList}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state.events
  }
}

export default connect(mapStateToProps)(Events)
