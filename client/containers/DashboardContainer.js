import React from 'react';
import {connect} from 'react-redux';
import Dashboard from '../components/Dashboard';
import * as actionCreators from '../actions';

export default connect(
  mapStateToProps,
  actionCreators
)(Dashboard);

function mapStateToProps(state) {
  return {};
}
