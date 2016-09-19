import React, {Component} from 'react';
import  {connect} from 'react-redux';
import {pushPath} from 'redux-simple-router';

export default function (ComposedComponent) {
  class NotAuthenticated extends Component {

    constructor(props, context) {
      super(props);
      context.router // will work
    }

    componentWillMount() {
      if (this.props.auth.isAuth) {
        this.context.router.push('/profile')
      }
    }

    componentWillUpdate(nextProps) {
      if (nextProps.auth.isAuth) {
        this.context.router.push('/profile')
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  NotAuthenticated.contextTypes = {
    router: React.PropTypes.object
  }
  function mapStateToProps(state) {
    return {auth: state.auth}
  }

  return connect(mapStateToProps)(NotAuthenticated);
}
