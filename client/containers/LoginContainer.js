import React from 'react';
import {connect} from 'react-redux';
import Login from '../components/Login';
import * as actionCreators from '../actions';

export default connect(
  mapStateToProps,
  actionCreators
)(Login);

function mapStateToProps(state) {
  return {};
}
