/**
 * Created by Bilanych on 14.10.2016.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux'
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ProfileView from '../../containers/home/ProfileView'
import Gallery from '../../containers/home/Gallery'
import Video from '../../containers/home/Video'




const style = {
    display: 'inline-block',
    margin: '20px 32px 16px 0px',
    paddingLeft: '-40px'
};

class SideMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showProfile: false,
            showGallery: false,
            showVideo:false,
        }
    }

    handleOnProfileItemClick() {
        this.setState({showProfile: true});
        this.setState({showGallery: false});
        this.setState({showVideo: false});
    }
    handleOnGalleryItemClick(){
        this.setState({showGallery: true});
        this.setState({showProfile: false});
        this.setState({showVideo: false});
    }
    handleOnshowVideoItemClick(){
        this.setState({showVideo: true});
        this.setState({showGallery: false});
        this.setState({showProfile: false});
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <Paper style={style}>
                    <Menu>
                        <MenuItem primaryText="Profile" onTouchTap={this.handleOnProfileItemClick.bind(this)}/>
                        <MenuItem primaryText="Gallery" onTouchTap={this.handleOnGalleryItemClick.bind(this)}/>
                        <MenuItem primaryText="Video" onTouchTap={this.handleOnshowVideoItemClick.bind(this)}/>
                    </Menu>
                </Paper>
                { this.state.showProfile ? <ProfileView {...this.props}/> : null }
                { this.state.showGallery ? <Gallery {...this.props}/> : null }
                { this.state.showVideo ? <Video {...this.props}/> : null }
            </div>
        )
    }
}

export default connect()(SideMenu)