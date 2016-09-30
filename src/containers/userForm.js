/**
 * Created by Bilanych on 30.09.2016.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {styles,userFormPaperStyle} from '../constants/UserDetailsConstants'
import {saveUser} from '../actions/EventsActions';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

class UserForm extends Component {
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
            open:false,
            errorMessages:{
                NothingToChange:"Nothing to change,please edit data",
                AllFieldsRequired:"All Fields are required, Please fill them",
                FirstNameDataIncorrect:"The Data in First Name field is incorrect",
                LastNameDataIncorrect:"The Data in Last Name field is incorrect",
                EmailDataIncorrect:"The Data in Email field is incorrect",
                PhoneDataIncorrect:"The Data in Phone field is incorrect",
                CompanyDataIncorrect:"The Data in Company field is incorrect",
            },
            modalMessage:''

        }
    }
    handleClose = () => {
        this.setState({open: false});
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

        if(this.state.attendeeErrors.firstNameError!==null||
            this.state.attendeeErrors.lastNameError!==null||
            this.state.attendeeErrors.emailError!==null||
            this.state.attendeeErrors.phoneError!==null||
            this.state.attendeeErrors.companyError!==null
        ){
            if(this.state.attendeeErrors.firstNameError!==null){
                this.setState({modalMessage:this.state.errorMessages.FirstNameDataIncorrect})
                this.setState({open: true});
                console.log(this.state.attendeeErrors.firstNameError)
            }
            else if(this.state.attendeeErrors.lastNameError!==null){
                this.setState({modalMessage:this.state.errorMessages.LastNameDataIncorrect})
                this.setState({open: true});
            }
            else if(this.state.attendeeErrors.emailError!==null){
                this.setState({modalMessage:this.state.errorMessages.EmailDataIncorrect})
                this.setState({open: true});
            }
            else if(this.state.attendeeErrors.phoneError!==null){
                this.setState({modalMessage:this.state.errorMessages.PhoneDataIncorrect})
                this.setState({open: true});
            }
            else if(this.state.attendeeErrors.companyError!==null){
                this.setState({modalMessage:this.state.errorMessages.CompanyDataIncorrect})
                this.setState({open: true});
            }

        }
        else if(this.state.attendee.firstName===''&&
            this.state.attendee.lastName===''&&
            this.state.attendee.email===''&&
            this.state.attendee.phone===''&&
            this.state.attendee.company===''
        ){
            this.setState({modalMessage:this.state.errorMessages.AllFieldsRequired});
            this.setState({open: true});
        }
        else if(this.state.attendee.firstName===this.props.user.firstName&&
            this.state.attendee.lastName===this.props.user.lastName&&
            this.state.attendee.email===this.props.user.email&&
            this.state.attendee.phone===this.props.user.phone&&
            this.state.attendee.company===this.props.user.company){
            this.setState({modalMessage:this.state.errorMessages.NothingToChange});
            this.setState({open: true});
        }

        else{
            this.props.dispatch(saveUser(this.state.attendee))
            this.setState({edit:true,cancelDisabled:true,editDisabled:false,saveDisabled:true,errorModalOpen:false})
        }
    }

  render(){
      const actions = [
          <FlatButton
              label="Cancel"

              onTouchTap={this.handleClose}
              style={{
                  textColor: '#9d223c',
                  backgroundColor: '#BCAAA4',

              }}
          />
      ];
      return(
          <div>
              <Dialog
                  actions={actions}
                  modal={false}
                  open={this.state.open}
                  onRequestClose={this.handleClose}
                  bodyStyle={{
                      backgroundColor:'#EF9A9A'
                  }}
                  actionsContainerStyle={{
                      backgroundColor:'#E57373'
                  }}
                  overlayStyle={{
                      backgroundColor:'#B0BEC5'
                  }}

              >

                      <h1 className="text-center">
                          {this.state.modalMessage}
                      </h1>



              </Dialog>
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
          </div>
      )
  }
}
function onButtonEditClick() {
    this.setState({edit:false,cancelDisabled:false,editDisabled:true,saveDisabled:false})
}
function onButtonCancelClick() {
    this.setState({edit:true,cancelDisabled:true,editDisabled:false,saveDisabled:true})
}
export default connect()(UserForm)