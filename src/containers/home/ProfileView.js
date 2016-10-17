/**
 * Created by Bilanych on 14.10.2016.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux'
import _ from 'lodash'



class ProfileView extends Component{
    constructor(props){
        super(props);
        this.state={
            origin:'',
        }
    }
    componentWillMount(){

}
    componentDidMount(){
        this.getOrigin();
    }

    getOrigin(){
        if(this.props.user_id.indexOf('google')===0){
            this.setState({origin:'google'})
        }
        else if(this.props.user_id.indexOf('twitter')===0){
            this.setState({origin:'twitter'})
        }
        else if(this.props.user_id.indexOf('facebook')===0){
            this.setState({origin:'facebook'})
        }
        else if(this.props.user_id.indexOf('linkedin')===0){
            this.setState({origin:'linkedin'})
        }
        else if(this.props.user_id.indexOf('windowslive')===0){
            this.setState({origin:'microsoft'})
        }
    }

    render(){
        return(
            <div className="contentDiv">
                <div className="profileText">
                    Email : {this.props.given_name}
                </div>
                <div className="profileText">
                    First Name : {this.props.family_name}
                </div>
                <div className="profileText">
                    Last Name : {this.props.nickname}
                </div>
                <div className="profileText">
                    Nickname : {this.props.email}
                </div>
                <div className="profileText">
                    You are logged in from : {this.state.origin}
                </div>



            </div>
        )
    }
}
export default connect()(ProfileView)
