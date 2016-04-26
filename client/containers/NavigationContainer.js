import React from 'react';
import {connect} from 'react-redux';
import Navigation from '../components/Navigation';
import * as actionCreators from '../actions';

export default connect(
  mapStateToProps,
  actionCreators
)(Navigation);

function mapStateToProps(state) {
  return {
    isAuthenticated: state.getIn(['auth', 'isAuthenticated'], false),
    email: state.getIn(['auth', 'email'])
  };
}
