import React, {Component} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import _ from 'lodash'
import cn from 'classnames'
import Divider from 'material-ui/Divider'
import * as EventsActions  from '../../../actions/EventsActions'
import Checkbox from 'material-ui/Checkbox'

class EventItem extends Component {
  constructor(props) {
    super(props)
  }

  toggleUuidFromCache(event, checked) {
    if (checked) {
      this.props.sessions_cache.push(this.props.item.uuid)
    } else {
      this.props.sessions_cache.pop(this.props.item.uuid)
    }
    this.props.dispatch(EventsActions.updateSessionsCache(this.props.sessions_cache))
  }

  render() {
    var status_classes = cn('status',
      {'open': this.props.item.status === "Open"},
      {'closed': this.props.item.status === "Closed"},
      {'draft': this.props.item.status === "Draft"},
      {'sold_out': this.props.item.status === "Sold Out"}
    )
    var checkbox_disable
    if (this.props.item.status === "Sold Out" || this.props.item.status === "Closed") {
      checkbox_disable = true
    }

    return (
      <div className="event_info ">
        <div className="session_checkbox">
          <Checkbox
            disabled={checkbox_disable}
            onCheck={this.toggleUuidFromCache.bind(this)}
          />
        </div>
        <div className="basic">
          <div className="left">
            <div className="dates">
              {this.props.item.start_date} - {this.props.item.end_date}
            </div>
            <div className="available_seats">
              <div className="values">{this.props.item.registration_limit}/{this.props.item.registered_count}</div>
              seats are available
            </div>
          </div>
          <div className="right">
            <div className={status_classes}>
              {this.props.item.status}
            </div>
          </div>
        </div>
        <div className="name">{this.props.item.name}</div>
        <div className="description">{this.props.item.description}</div>
        <Divider/>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    ...state.events
  }
}

export default connect(mapStateToProps)(EventItem)
