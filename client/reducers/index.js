import {Map, List} from 'immutable';
import {FETCH_TWEETS} from '../actions'

function fetchTweets(state) {
  return state.set('tweets', List([
    {id: 1, text: 'foo'}
  ]));
}

export default function (state = Map(), action) {
  switch (action.type) {
    case FETCH_TWEETS:
      return fetchTweets(state);
  }
  return state;
};
