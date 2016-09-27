import React, {Component} from 'react'
import {connect} from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {push} from 'react-router-redux'
import * as EventsActions  from '../../actions/EventsActions'

//TODO: this code needs more clearing!!!

class AttendeeForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      attendee: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
      },
      attendeeErrors: {
        firstNameError: null,
        lastNameError: null,
        emailError: null,
        phoneError: null,
        companyError: null,
      },
      style: {
        width: '100%',
        marginTop: 10,
      }
    }
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  onFistNameChange(event) {
    let attendee = this.state.attendee
    attendee.firstName = event.target.value
    this.setState({attendee: attendee})
    let attendeeErrors = this.state.attendeeErrors
    attendeeErrors.firstNameError = this.validateText(event)
    this.setState({attendeeErrors: attendeeErrors})
  }

  onLastNameChange(event) {
    let attendee = this.state.attendee
    attendee.lastName = event.target.value
    this.setState({attendee: attendee})
    let attendeeErrors = this.state.attendeeErrors
    attendeeErrors.lastNameError = this.validateText(event)
    this.setState({attendeeErrors: attendeeErrors})
  }

  onEmailChange(event) {
    this.validateEmail(event)
    let attendee = this.state.attendee
    attendee.email = event.target.value
    this.setState({attendee: attendee})
  }

  onPhoneChange(event) {
    this.validatePhone(event)
    let attendee = this.state.attendee
    attendee.phone = event.target.value
    this.setState({attendee: attendee})
  }

  onCompanyChange(event) {
    let attendee = this.state.attendee
    attendee.company = event.target.value
    this.setState({attendee: attendee})
    let attendeeErrors = this.state.attendeeErrors
    attendeeErrors.companyError = this.validateText(event)
    this.setState({attendeeErrors: attendeeErrors})
  }

  validateText(event) {
    const username = event.target.value
    const alphanumeric = /^[a-z0-9]+$/i
    const usernameIsValid = alphanumeric.test(username)
    let error
    if (event.target.value.length > 0 && !usernameIsValid) {
      error = 'This field must consist of only letters and numbers'
    } else {
      error = null
    }
    return error
  }

   validateEmail(event) {
    const email = event.target.value
    const emailEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailIsValid = emailEx.test(email)
    let error
    if (event.target.value.length > 0 && !emailIsValid) {
      error = 'Email is not correct'
    } else {
      error = null
    }

    let attendeeErrors = this.state.attendeeErrors
    attendeeErrors.emailError = error
    this.setState({attendeeErrors: attendeeErrors})
  }

  validatePhone(event) {
    const phone = event.target.value
    const phoneEx = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/
    const phoneIsValid = phoneEx.test(phone)
    let error
    if (event.target.value.length > 0 && !phoneIsValid) {
      error = 'Phone format is not correct'
    } else {
      error = null
    }

    let attendeeErrors = this.state.attendeeErrors
    attendeeErrors.phoneError = error
    this.setState({attendeeErrors: attendeeErrors})
  }

  isBlankField() {
    return _.some(this.state.attendee, function (field) {
      return field === ''
    })
  }

  isErrorField() {
    return _.some(this.state.attendeeErrors, function (field) {
      return field !== null
    })
  }

  login(e) {
    e.preventDefault()
    //this.props.dispatch(EventsActions.saveAttendee(this.state.attendee, this.props.event_uuid, this.props.sessions_cache))

    this.props.dispatch(EventsActions.saveUser(this.state.attendee))
    this.context.router.push('user_details')

  }

  render() {

    return (
      <div className="attendee_form">
        <div className="attendee_form_header">Attendee Form</div>
        <form onSubmit={::this.login}>
          <TextField
            hintText="First Name"
            onBlur={this.onFistNameChange.bind(this)}
            errorText={this.state.attendeeErrors.firstNameError}
            fullWidth={true}
          /><br />
          <TextField
            hintText="Last Name"
            onBlur={this.onLastNameChange.bind(this)}
            errorText={this.state.attendeeErrors.lastNameError}
            fullWidth={true}
          /><br />
          <TextField
            hintText="Email"
            onBlur={this.onEmailChange.bind(this)}
            errorText={this.state.attendeeErrors.emailError}
            fullWidth={true}
          /><br />
          <TextField
            hintText="Phone"
            onBlur={this.onPhoneChange.bind(this)}
            errorText={this.state.attendeeErrors.phoneError}
            fullWidth={true}
          /><br />
          <TextField
            hintText="Company"
            onBlur={this.onCompanyChange.bind(this)}
            errorText={this.state.attendeeErrors.companyError}
            fullWidth={true}
          /><br />
          <RaisedButton
            type="submit"
            label="Sign Up"
            primary={true}
            style={this.state.style}
          />
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state.events
  }
}
export default connect(mapStateToProps)(AttendeeForm)
