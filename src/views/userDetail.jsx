import React, {Component} from 'react'
import {connect} from 'react-redux'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import {Table, TableBody,  TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
    from 'material-ui/Table';
import Snackbar from 'material-ui/Snackbar';
import { darkBlack,} from 'material-ui/styles/colors';
import DatePicker from 'material-ui/DatePicker';
import {saveUser} from '../actions/EventsActions';
import {blue300, indigo900} from 'material-ui/styles/colors';
import _ from 'lodash'
import {Popover,ButtonToolbar,OverlayTrigger,Button} from 'react-bootstrap';
import ReactDOM from 'react-dom'



class Events extends Component {
  constructor(props) {
    super(props)
    this.state= {

        attendeeErrors: {
            firstNameError: null,
            lastNameError: null,
            emailError: null,
            phoneError: null,
            companyError: null,
        },
        attendee: {
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
            email: this.props.user.email,
            phone: this.props.user.phone,
            company: this.props.user.company,
        },
        edit:true,
        cancelDisabled:true,
        editDisabled:false,
        saveDisabled:true,
        errorModalOpen:false,


    }


  }
    snackbarClose = () => {
        this.setState({
            errorModalOpen: false,
        });
    };



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
        //     console.log(event)
        // console.log(event.target)
        // console.log(event)

        let attendee = this.state.attendee;
            attendee.email = event.target.value;
            this.validateEmail(attendee.email);
            this.setState({attendee: attendee});


    }

    onPhoneChange(event) {
        this.validatePhone(event)
        let attendee = this.state.attendee
        attendee.phone = event.target.value
        this.setState({attendee: attendee})
    }
    validatePhone(event) {
        const phone = event.target.value
        const phoneEx = /^[\s()+-]*([0-9][\s()+-]*){6,15}$/
        const phoneIsValid = phoneEx.test(phone)
        let error
        if (event.target.value.length >= 0 && !phoneIsValid) {
            error = 'Phone format is not correct'
        } else {
            error = null
        }

        let attendeeErrors = this.state.attendeeErrors
        attendeeErrors.phoneError = error
        this.setState({attendeeErrors: attendeeErrors})
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
        if (event.target.value.length >= 0 && !usernameIsValid) {
            error = 'This field must consist of only letters and numbers'
        } else {
            error = null
        }
        return error
    }

    validateEmail(e) {
        const email = e
        const emailEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const emailIsValid = emailEx.test(email)
        let error
        if (email.length >= 0 && !emailIsValid) {
            error = 'Email is not correct'
        } else {
            error = null
        }

        let attendeeErrors = this.state.attendeeErrors
        attendeeErrors.emailError = error
        this.setState({attendeeErrors: attendeeErrors})

    }

    updateUserForm(e) {

        e.preventDefault()
        //this.props.dispatch(EventsActions.saveAttendee(this.state.attendee, this.props.event_uuid, this.props.sessions_cache))

        this.props.dispatch(saveUser(this.state.attendee))
        // console.log(this.props)
        // console.log(this.state.attendee,1111111111)
        // console.log(this.props.user);

        this.setState({edit:true,cancelDisabled:true,editDisabled:false,saveDisabled:true})
        if(true){
            this.setState({errorModalOpen:true})
        }
        else{

        }
    }

    










  render() {

      const styles = {
          chip: {
              margin: 4,
              textAlign: 'center'
          },
          errorModal:{
              align:'center',
              background: '#D50000',
              display: 'flex',
              textColor: '#9d223c'

          },
          wrapper: {
              display: 'flex',
              flexWrap: 'wrap',
          },
      };

      var toolTipDescription;
       var res = this.props.events.map((main_event)=>{
          if(main_event.uuid===this.props.event_uuid){

              return main_event.sessions.map((child_event)=>{

                  return this.props.sessions_cache.map((uuid)=>{
                      if(uuid===child_event.uuid){
                            toolTipDescription = child_event.description;

                          return (
                              <TableRow >

                                      <TableRowColumn  style={{textAlign: 'center'}} >
                                          <OverlayTrigger
                                              trigger={['hover', 'focus']}
                                              placement="top"
                                              overlay={
                                                  <Popover id="popover-trigger-hover-focus" title="There Full Data">
                                                      <strong>{child_event.uuid}</strong>
                                                  </Popover>
                                              }
                                          >
                                          <text>{child_event.uuid}</text>
                                          </OverlayTrigger>
                                      </TableRowColumn>
                                      <TableRowColumn  style={{textAlign: 'center'}}>
                                          <Chip style={styles.chip}>
                                              {child_event.name}
                                          </Chip>
                                      </TableRowColumn>
                                  <OverlayTrigger
                                      trigger={['hover', 'focus']}
                                      placement="top"
                                      overlay={
                                          <Popover id="popover-trigger-hover-focus" title="There Full Data">
                                              <strong>{toolTipDescription}</strong>
                                          </Popover>
                                      }
                                  >
                                      <TableRowColumn style={{textAlign: 'center'}}>

                                            {child_event.description}

                                      </TableRowColumn></OverlayTrigger>
                                      <TableRowColumn  style={{textAlign: 'center'}}>
                                          <DatePicker id="start_data" style={{margin: 10}} disabled={true} defaultDate={new Date(child_event.start_date)}/>
                                      </TableRowColumn>
                                      <TableRowColumn  style={{textAlign: 'center'}}>
                                          <DatePicker id="end_data" style={{margin: 10}} disabled={true} defaultDate={new Date(child_event.end_date)}/>
                                      </TableRowColumn>
                              </TableRow>
                          )
                      }
                  })
              })
          }
      });
    console.log(this.state)
      console.log(this.props)
     // console.log(this.props.user)
    return (

        <div>
            <form onSubmit={::this.updateUserForm}>
            <TextField

                errorText={this.state.attendeeErrors.firstNameError}
                onBlur={this.onFistNameChange.bind(this)}
                defaultValue={this.props.user.firstName}
                floatingLabelText="FirstName"
                type="text"
                disabled={this.state.edit}
            /><br />
            <br />
            <TextField
                errorText={this.state.attendeeErrors.firstNameError}
                onBlur={this.onLastNameChange.bind(this)}
                defaultValue={this.props.user.lastName}
                floatingLabelText="Last Name"
                type="text"
                disabled={this.state.edit}
            /><br />
            <TextField
                errorText={this.state.attendeeErrors.emailError}
                onBlur={(e) => {this.onEmailChange(e)}}
                defaultValue={this.props.user.email}
                floatingLabelText="Email"
                type="text"
                disabled={this.state.edit}
            /><br />
            <TextField
                errorText={this.state.attendeeErrors.phoneError}
                onBlur={this.onPhoneChange.bind(this)}
                defaultValue={this.props.user.phone}
                floatingLabelText="Phone"
                type="text"
                disabled={this.state.edit}
            /><br />
            <TextField
                errorText={this.state.attendeeErrors.firstNameError}
                onBlur={this.onCompanyChange.bind(this)}
                defaultValue={this.props.user.company}
                floatingLabelText="Company"
                type="text"
                disabled={this.state.edit}
            />
            <br/>
            <RaisedButton type="submit" label="SAVE"
                          //onClick={onButtonSaveClick.bind(this)}
                          primary={true}
                          disabled={this.state.saveDisabled}
                          style={styles.chip} />
            <RaisedButton label="EDIT"
                          secondary={true}
                          style={styles.chip}
                          disabled={this.state.editDisabled}
                          onClick={onButtonEditClick.bind(this)}
            />
                <RaisedButton label="CANCEL"
                              disabled={this.state.cancelDisabled}
                              style={styles.chip}
                              onClick={onButtonCancelClick.bind(this)}
                />
            <br/>
            </form>
            <Table height={'inherit'}>
                <TableHeader adjustForCheckbox={false}>
                    <TableRow style={{textAlign: 'center'}}>
                        <TableHeaderColumn tooltip="The ID" style={{textAlign: 'center'}}>ID</TableHeaderColumn>
                        <TableHeaderColumn tooltip="The NAME" style={{textAlign: 'center'}}>Name</TableHeaderColumn>
                        <TableHeaderColumn tooltip="The STATUS" style={{textAlign: 'center'}}>Description</TableHeaderColumn>
                        <TableHeaderColumn tooltip="The START DATA" style={{textAlign: 'center'}}>Start Data</TableHeaderColumn>
                        <TableHeaderColumn tooltip="The END DATA" style={{textAlign: 'center'}}>End Data</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false} showRowHover={true}>
                    {res}
                </TableBody>
            </Table>
            <Snackbar message={"DATA is INCORRECT!!! Please check it."}
                      autoHideDuration={3000}
                      open={this.state.errorModalOpen}
                      style={styles.errorModal}
                      className={'snackError'}
                      onRequestClose={this.snackbarClose}
            />


        </div>
    )
  }
}

function formValidate(){

}



function onButtonEditClick() {
    this.setState({edit:false,cancelDisabled:false,editDisabled:true,saveDisabled:false})
}
function onButtonSaveClick() {

}
function onButtonCancelClick() {
    this.setState({edit:true,cancelDisabled:true,editDisabled:false,saveDisabled:true})
}
const mapStateToProps = state => {
  return {
    ...state.events,

  }
}

export default connect(mapStateToProps)(Events)
