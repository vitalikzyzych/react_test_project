/**
 * Created by Bilanych on 12.10.2016.
 */
import Auth0Lock from 'auth0-lock'
import { browserHistory } from 'react-router'
import {connect} from 'react-redux'
import React, {Component} from 'react'

const clientId = 'XdhNs0TItnFeMyWm52PCRvthEIGxYTuY'
const domain = 'bbilanych.eu.auth0.com'
class AuthService extends Component{

    constructor(props){
        super(props)
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

    _doAuthentication(authResult){
        // Saves the user token
        this.setToken(authResult.idToken)
        // navigate to the home route
        browserHistory.replace('home')
        this.context.router.push('home')
        // Async loads the user profile data
        this.lock.getProfile(authResult.idToken, (error, profile) => {
            if (error) {
                console.log('Error loading the Profile', error)
            } else {
                this.setProfile(profile)
            }
        })
    }

    _authorizationError(error){
        // Unexpected authentication error
        console.log('Authentication Error', error)
    }



    loggedIn(){
        // Checks if there is a saved token and it's still valid
        const token = this.getToken()
        return !!token && !isTokenExpired(token)
    }

    setProfile(profile){
        // Saves profile data to localStorage
        localStorage.setItem('profile', JSON.stringify(profile))
        // Triggers profile_updated event to update the UI

    }

    getProfile(){
        // Retrieves the profile data from localStorage
        const profile = localStorage.getItem('profile')
        return profile ? JSON.parse(localStorage.profile) : {}
    }

    setToken(idToken){
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken)
    }



    logout(){
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
    }
    login(){
        // Call the show method to display the widget.
        this.lock.show()
    }

    render(){
        return(
            <div>
                <button onClick={this.login}>login</button>
            </div>
        )
    }
}
export default connect()(AuthService)
