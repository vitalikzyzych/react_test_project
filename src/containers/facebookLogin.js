/**
 * Created by Bilanych on 07.10.2016.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import * as EventsActions  from '../actions/EventsActions'

class FacebookLogin extends Component {
    constructor(props) {
        super(props)
        this.state={

            user:{
                id: null,
                firstName: '',
                lastName: '',
                email: '',
            }
        }

    }
    static contextTypes = {
        router: React.PropTypes.object
    }


    componentDidMount() {
        window.fbAsyncInit = function() {
            FB.init({
                appId      : '1180021708703158',
                xfbml      : true,
                version    : 'v2.8'
            });
            FB.getLoginStatus(function(response) {
                this.statusChangeCallback(response);
            }.bind(this));
        }.bind(this);

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        function checkLoginState() {
            FB.getLoginStatus(function(response) {
                this.statusChangeCallback(response);
                console.log(response)
            }.bind(this));
        }

    }

    testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.name + '!';
    });
}
    statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        this.testAPI();
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        document.getElementById('status').innerHTML = 'Please log ' +
            'into this app.';
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        document.getElementById('status').innerHTML = 'Please log ' +
            'into Facebook.';
    }
}
    onClick(){
        var self = this;
        window.FB.login((response) => {
            console.log(response);
            if (response.status === 'connected') {
                // Logged into your app and Facebook.
               // window.location = 'user_details'
                FB.api('/me?fields=id,first_name,last_name,email,permissions', function(response) {
                    console.log('Good to see you, ' + response.email + '.');
                    console.log(response)

                    this.setState({

                        user:{
                            id:response.id,
                            email:response.email,
                            firstName:response.first_name,
                            lastName:response.last_name
                        }
                    })
                    this.props.dispatch(EventsActions.saveUser(this.state.user))
                    console.log(this.state)
                    this.context.router.push('user_details')

                }.bind(self));

            } else if (response.status === 'not_authorized') {
                // The person is logged into Facebook, but not your app.
                document.getElementById('status').innerHTML = 'Please log ' +
                    'into this app.';
            } else {
                // The person is not logged into Facebook, so we're not sure if
                // they are logged into this app or not.
                document.getElementById('status').innerHTML = 'Please log ' +
                    'into Facebook.';
            }
        },{scope: 'email,public_profile',return_scopes:true});



    }

    render() {
        return (
            <div className="facebook_login">

                <div
                    className="fb-login-button"
                    data-max-rows="1"
                    data-size="xlarge"
                    data-show-faces="false"
                    data-auto-logout-link="true"
                >
                </div>
                <div><b id="status"></b></div>
                <button onClick={this.onClick.bind(this)}>button</button>
            </div>
        );
    }

}
export default connect()(FacebookLogin)