/**
 * Created by Bilanych on 17.10.2016.
 */
/**
 * Created by Bilanych on 17.10.2016.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import YoutubeFrame from '../../containers/home/YoutubeFrame'

const apiKey = 'AIzaSyAQYLZ_MhoI-C1QJCGkft3gISvdgqc-BUg';
const clientId = '860218619283-lnsj4q6nn2kal88e9sdb0eubqcovgv98.apps.googleusercontent.com'
const scopes = 'bbilanych@gmail.com';
class Video extends Component {

    constructor(props) {
        super(props)
        this.state = {}

    }

    componentWillMount() {

    }

    componentDidMount() {

        function initAuth() {

            var signinButton = document.getElementById('signin-button');
            var signoutButton = document.getElementById('signout-button');

            function initAuth() {
                window.gapi.client.setApiKey(apiKey);
                window.gapi.auth2.init({
                    client_id: clientId,
                    scope: scopes
                }).then(function () {
                    // Listen for sign-in state changes.
                    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

                    // Handle the initial sign-in state.
                    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

                    signinButton.addEventListener("click", handleSigninClick);
                    signoutButton.addEventListener("click", handleSignoutClick);
                });
            }

            function updateSigninStatus(isSignedIn) {
                if (isSignedIn) {
                    signinButton.style.display = 'none';
                    signoutButton.style.display = 'block';
                    makeApiCall();
                } else {
                    signinButton.style.display = 'block';
                    signoutButton.style.display = 'none';
                }
            }

            function handleSigninClick(event) {
                gapi.auth2.getAuthInstance().signIn();
            }

            function handleSignoutClick(event) {
                gapi.auth2.getAuthInstance().signOut();
            }

// Load the API client and auth library
            gapi.load('client:auth2', initAuth);
        }
    }


    render() {


        return (
            <div className="contentDiv">
                <div className="signin-button"></div>
                <div className="signout-button"></div>
                <YoutubeFrame/>
            </div>
        )
    }
}
export default connect()(Video)
