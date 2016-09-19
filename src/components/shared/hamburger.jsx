import React, {Component} from 'react'
import cn from 'classnames'

class Hamburger extends Component {

  render() {
    var classes = cn(
      "hamburger",
      "hamburger--" + this.props.type,
    )
    return (
      <div className={classes}>
        <div className="hamburger-box">
          <div className="hamburger-inner"></div>
        </div>
      </div>
    )
  }
}

export default Hamburger
