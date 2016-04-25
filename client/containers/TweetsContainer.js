import React from 'react';
import {connect} from 'react-redux';
import Tweets from '../components/Tweets';
import * as actionCreators from '../actions';

export default connect(
  mapStateToProps,
  actionCreators
)(Tweets);

function mapStateToProps(state) {
  return {
    tweets: state.getIn(['tweets', 'items'], [])
  };
}
