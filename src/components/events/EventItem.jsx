import React, {Component} from 'react'
import {Link} from 'react-router'
import {Card} from 'material-ui/Card'
import EventShortDescription from 'components/events/EventShortDescription'

class EventItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Card>
        <div className="event_info">
          <EventShortDescription item={this.props.item}/>
        </div>
        <div className="right">
          <div className="rsvp">
            <Link to={"/events/" + this.props.item.uuid}>
              RSVP
            </Link>
          </div>
        </div>
      </Card>
    )
  }
}

export default EventItem
