import React, {Component} from 'react'
import {connect} from 'react-redux'
import UserTable from '../containers/userTable'
import UserForm from '../containers/userForm'
import UploadImage from '../containers/uploadImage'


class Events extends Component {
  constructor(props) {
    super(props)
    this.state= {

    }
  }
  render() {
          return (
        <div>
          <UserForm {...this.props}/>
          <UserTable {...this.props}/>
          <UploadImage {...this.props}/>

        </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    ...state.events,
  }
};
export default connect(mapStateToProps)(Events)
