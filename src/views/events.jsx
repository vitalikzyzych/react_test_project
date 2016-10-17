import React, {Component} from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'
import * as EventsActions  from 'actions/EventsActions'
import EventItem from 'components/events/EventItem'
import AuthService from '../utils/AuthService'

class Events extends Component {
  constructor(props) {
    super(props)
    this.state={
      token:localStorage.getItem('id_token'),
    }
  }
  static contextTypes = {
    router: React.PropTypes.object,

  }

  componentWillMount() {
    this.props.dispatch(EventsActions.load())
    if(this.getToken()!== null){
      this.context.router.push('home')
    }
  }
  getToken(){
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token')
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
        <AuthService/>
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
