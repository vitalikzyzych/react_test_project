/**
 * Created by Bilanych on 12.10.2016.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'



class Home extends Component {
    constructor(props) {
        super(props)
        this.state= {

        }
    }
    render() {

        return (
            <div>
                <p>Hello!!!</p>
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
