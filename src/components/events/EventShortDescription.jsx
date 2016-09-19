import React, {Component} from 'react'
import cn from 'classnames'

class EventShortDescription extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var status_classes = cn('status',
      {'open': this.props.item.status === "Open"},
      {'closed': this.props.item.status === "Closed"}
    )
    return (
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
    )
  }
}

export default EventShortDescription
