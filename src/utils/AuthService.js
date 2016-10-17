/**
 * Created by Bilanych on 12.10.2016.
 */
import Auth0Lock from 'auth0-lock'
import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import React, {Component} from 'react'
import * as EventsActions from '../actions/EventsActions'
import RaisedButton from 'material-ui/RaisedButton'


const clientId = 'XdhNs0TItnFeMyWm52PCRvthEIGxYTuY'
const domain = 'bbilanych.eu.auth0.com'
class AuthService extends Component {

    constructor(props) {
        super(props)
        this.state = {
            token: '',
            profile: null
        }
        this.lock = new Auth0Lock(clientId, domain, {})
        // Add callback for lock `authenticated` event
        this.lock.on('authenticated', this._doAuthentication.bind(this))
        // Add callback for lock `authorization_error` event
        this.lock.on('authorization_error', this._authorizationError.bind(this))
        // binds login functions to keep this context
        this.login = this.login.bind(this)
    }

    static contextTypes = {
        router: React.PropTypes.object
    }
    componentDidMount(){
        this.setState({profile: JSON.parse(localStorage.getItem('profile'))})
        this.props.dispatch(EventsActions.setProfile(this.state.profile))
    }

    _doAuthentication(authResult) {
        // Saves the user token
        this.setToken(authResult.idToken)
        // navigate to the home route

        // Async loads the user profile data
        this.lock.getProfile(authResult.idToken, (error, profile) => {
            if (error) {
                console.log('Error loading the Profile', error)
            } else {
                this.setProfile(profile)
                browserHistory.replace('home')
                this.context.router.push('home')
            }
        })
    }

    _authorizationError(error) {
        // Unexpected authentication error
        console.log('Authentication Error', error)
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken()
        return !!token && !isTokenExpired(token)
    }

    setProfile(profile) {
        // Saves profile data to localStorage
        localStorage.setItem('profile', JSON.stringify(profile))


    }

    getProfile() {
        // Retrieves the profile data from localStorage
        const profile = localStorage.getItem('profile')
        return profile ? JSON.parse(localStorage.profile) : {}
    }

    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken)
        this.setState({token: localStorage.getItem('id_token')})
        this.props.dispatch(EventsActions.setToken(this.state.token))
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
    }

    login() {
        // Call the show method to display the widget.
        this.lock.show()
    }

    render() {
        return (
            <div>
                <RaisedButton id="loginBtn"
                    onClick={this.login}
                    label="login"
                    icon={<img
                        src="https://secure.gravatar.com/avatar/805765c256ff8617fcad483b5476faf2?s=420"
                        style={{
                            maxWidth:20,
                            maxHeight:20,
                            }}/>}
                    labelPosition="before"
                              style={{marginBottom:10}}
                              backgroundColor='#DCEDC8'
                />
            </div>
        )
    }
}
export default connect()(AuthService)
