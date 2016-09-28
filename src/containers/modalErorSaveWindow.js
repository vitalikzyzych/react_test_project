/**
 * Created by Bilanych on 28.09.2016.
 */
import React, {Component} from 'react';
import  {connect} from 'react-redux';

class ErrorSaveModalWindow extends Component{
    constructor(props){
        super(props);
    }
    render(){
        console.log(this.props,"props")

        return(
            <div>
                {this.props.UserDetails.lastName}
            </div>
        )
    }


}
function mapStateToProps(state){

    return{userModal:state.attendee}
}
export default connect(mapStateToProps)(ErrorSaveModalWindow)