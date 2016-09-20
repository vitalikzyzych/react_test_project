import React, {Component} from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'

class Events extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    console.log(this.props);
    return (
      <div>Hello</div>      
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state.events
  }
}

export default connect(mapStateToProps)(Events)
