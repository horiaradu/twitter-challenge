import React from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export function requireAuthentication(Component) {
  class Authenticated extends React.Component {
    constructor(props) {
      super(props);
      this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentWillMount() {
      this.checkAuth(this.props.isAuthenticated);
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps.isAuthenticated);
    }

    checkAuth(isAuthenticated) {
      if (!isAuthenticated) {
        hashHistory.push('/login');
      }
    }

    render() {
      return (
        <div>
          {this.props.isAuthenticated === true
            ? <Component {...this.props}/>
            : null
          }
        </div>
      )

    }
  }

  const mapStateToProps = (state) => ({
    isAuthenticated: state.getIn(['auth', 'isAuthenticated'], false)
  });

  return connect(mapStateToProps)(Authenticated);
}