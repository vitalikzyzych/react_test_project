import React, {Component} from 'react';
import  {connect} from 'react-redux';
import {pushPath} from 'redux-simple-router';

export default function (ComposedComponent) {
  class Authenticated extends Component {

    constructor(props, context) {
      super(props);
      context.router // will work
    }

    componentWillMount() {
      if (!this.props.auth.isAuth) {
        //this.props.dispatch(pushPath('/'));
        this.context.router.push('/')
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.auth.isAuth) {
        this.context.router.push('/')
        //this.props.dispatch(pushPath('/'));
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  Authenticated.contextTypes = {
    router: React.PropTypes.object
  }
  function mapStateToProps(state) {
    return {auth: state.auth}
  }

  return connect(mapStateToProps)(Authenticated);
}
