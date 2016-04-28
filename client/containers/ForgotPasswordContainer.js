import React from 'react';
import {connect} from 'react-redux';
import ForgotPassword from '../components/ForgotPassword';
import * as actionCreators from '../actions';

export default connect(
  mapStateToProps,
  actionCreators
)(ForgotPassword);

function mapStateToProps(state) {
  return {
    email: state.get('email', ''),
    emailStatus: state.getIn(['forgotPassword', 'emailStatus'], null),
    ok: state.getIn(['forgotPassword', 'ok'], null)
  };
}
