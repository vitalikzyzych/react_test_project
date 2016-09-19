import React, {Component} from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'
import * as EventsActions  from 'actions/EventsActions'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import EventShortDescription from 'components/events/EventShortDescription'
import SessionItem from 'components/events/session/SessionItem'
import AttendeeForm from 'components/attendee/AttendeeForm'

class EventDetails extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.setState({currentItem: this._getCurrentEvent()})
  }

  componentDidMount() {
    this.props.dispatch(EventsActions.updateSessionsCache([]))
  }

  _getCurrentEvent() {
    return _.find(this.props.events, {'uuid': this.props.params.eventId})
  }

  getSessions(sessions) {
    var sessionList = _.map(sessions, (item, i) => {
      return (
        <SessionItem
          item={item}
          key={i}
        />
      )
    })
    return sessionList
  }

  render() {
    let sessionList = this.getSessions(this.state.currentItem.sessions)
    return (
      <div className="events">
        <Card>
          <div className="event_info">
            <EventShortDescription item={this.state.currentItem}/>
            <div className="name">{this.state.currentItem.name}</div>
            <div className="description">{this.state.currentItem.description}</div>
          </div>
          <div className="sessions_list">
            <div className="sessions_header">
              Event sessions
            </div>
            {sessionList}
          </div>
          <AttendeeForm/>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state.events
  }
}

export default connect(mapStateToProps)(EventDetails)
