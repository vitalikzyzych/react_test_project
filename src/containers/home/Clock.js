/**
 * Created by Bilanych on 17.10.2016.
 */
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'

class Clock extends Component{

    constructor(props){
        super(props)
    }
    componentWillMount(){
        this.setTime();
    }
    componentDidMount(){
        this.intervalID = window.setInterval(function () {
            this.setTime();
        }.bind(this), 1000);
    }

    setTime(){

        var currentdate = new Date();
        var timeZone = currentdate.getTimezoneOffset()/60;
        var hours = currentdate.getUTCHours()- timeZone;

        // correct for number over 24, and negatives
        if( hours >= 24 ){ hours -= 24; }
        if( hours < 0   ){ hours += 12; }

        // add leading zero, first convert hours to string
        hours = hours + "";
        if( hours.length == 1 ){ hours = "0" + hours; }

        // minutes are the same on every time zone
        var minutes = currentdate.getUTCMinutes();

        // add leading zero, first convert hours to string
        minutes = minutes + "";
        if( minutes.length == 1 ){ minutes = "0" + minutes; }

        var seconds = currentdate.getUTCSeconds();
        this.setState({
            hours: hours,
            minutes: minutes,
            seconds: seconds
        });
    }
    componentWillUnmount(){
        clearInterval(this.intervalID)
    }

    render(){
        return(
            <div className="octicon-clock">
                {this.state.hours}:{this.state.minutes}:{this.state.seconds}
            </div>
        )
    }
}
export default connect()(Clock)
