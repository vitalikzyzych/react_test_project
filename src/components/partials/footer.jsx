import React, {Component} from 'react'
import {Link} from 'react-router'


class Footer extends Component {

  render() {

    return (
      <footer>
        <div className="footer-limiter">
          <div className="footer-right">
            <a href="#"><i className="vz-twitter"></i></a>
            <a href="#"><i className="vz-linkedin"></i></a>
            <a href="#"><i className="vz-github"></i></a>
          </div>
          <div className="footer-left">
            <p className="footer-links">Sticky footer</p>
            <p>Company Name © 2016</p>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
