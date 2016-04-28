import React from 'react';
import {connect} from 'react-redux';
import ResetPassword from '../components/ResetPassword';
import * as actionCreators from '../actions';

export default connect(
  mapStateToProps,
  actionCreators
)(ResetPassword);

function mapStateToProps(state) {
  return {
    email: state.get('email', ''),
    password: state.getIn(['resetPassword', 'password'], ''),
    confirmPassword: state.getIn(['resetPassword', 'confirmPassword'], ''),
    resetStatus: state.getIn(['resetPassword', 'resetStatus'], null),
    ok: state.getIn(['resetPassword', 'ok'], null)
  };
}
