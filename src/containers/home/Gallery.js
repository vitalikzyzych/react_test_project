/**
 * Created by Bilanych on 14.10.2016.
 */
/**
 * Created by Bilanych on 14.10.2016.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Card,CardMedia,CardTitle} from 'material-ui/Card';



class Gallery extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="contentDiv">
                <Card>
                    <CardMedia overlay={<CardTitle subtitle="Overlay subtitle" />} >
                        <img src={this.props.picture} sizes="10px 10px"/>
                    </CardMedia>
                </Card>
            </div>
        )
    }
}
export default connect()(Gallery)
