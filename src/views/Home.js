/**
 * Created by Bilanych on 12.10.2016.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as EventsActions  from 'actions/EventsActions'
import Clock from '../containers/home/Clock'
import Logout from '../containers/home/logout'
import SideMenu from '../containers/home/SideMenu'
import styles from '../css/homeProfileStyles.css'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: localStorage.getItem('id_token'),
            profile: JSON.parse(localStorage.getItem('profile'))
        }

    }
    static contextTypes = {
        router: React.PropTypes.object,

    }
    componentWillMount(){
        if(this.state.token === null){
            this.context.router.push('/')

        }


    }
    componentDidMount() {
        this.props.dispatch(EventsActions.setToken(this.state.token))
        this.props.dispatch(EventsActions.setProfile(this.state.profile))
    }


    render() {
        return (
            <div id="mainDiv">
                <SideMenu {...this.props.profile}/>
                <Logout/>
                <Clock/>
            </div>
        )
    }
}
const mapStateToProps = state => {

    return {
        ...state.events,
    }
};
export default connect(mapStateToProps)(Home)
