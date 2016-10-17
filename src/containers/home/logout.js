/**
 * Created by Bilanych on 13.10.2016.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'


class Logout extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //TODO This is a functional for crazy ,button !!!!
        // $('#ddd').hover(function () {
        //     var bodyWidth = 1000
        //     var bodyHeight = 200
        //     var randPosX = Math.floor((Math.random() * bodyWidth));
        //     var randPosY = Math.floor((Math.random() * bodyHeight));
        //     var posLog = document.getElementById('mainDiv');
        //     var posXY = 'x: ' + randPosX + '<br />' + 'y: ' + randPosY;
        //     $('#ddd').css('position', 'absolute');
        //     $('#ddd').css('left', randPosX);
        //     $('#ddd').css('top', randPosY);
        //     posLog.innerHTML = posXY
        // });
    }

    handleOnLogOutButtonClick(){
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
        browserHistory.replace('/')
    }

    render() {

        return (
            <div>
                <RaisedButton
                    backgroundColor='#EF9A9A'
                    label="Log Out"
                    onClick={this.handleOnLogOutButtonClick.bind(this)}
                />


            </div>
        )
    }
}

export default connect()(Logout)
