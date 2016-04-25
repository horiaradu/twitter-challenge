import React from 'react';
import {connect} from 'react-redux';
import Login from '../components/Login';
import * as actionCreators from '../actions';

export default connect(
  mapStateToProps,
  actionCreators
)(Login);

function mapStateToProps(state) {
  return {
    email: state.get('email', ''),
    password: state.get('password', ''),
    authError: state.getIn(['auth', 'statusText'], null),
    authStatus: state.getIn(['auth', 'status'], null)
  };
}
