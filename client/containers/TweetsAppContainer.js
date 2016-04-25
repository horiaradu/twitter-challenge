import React from 'react';
import {connect} from 'react-redux';
import TweetsApp from '../components/TweetsApp';
import * as actionCreators from '../actions';
import {List} from 'immutable';

export default connect(
  mapStateToProps,
  actionCreators
)(TweetsApp);

function mapStateToProps(state) {
  return {
    tweets: state.getIn(['tweets', 'items'], List()),
    isFetching: state.getIn(['tweets', 'isFetching'], false)
  };
}
