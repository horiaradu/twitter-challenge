require('../styles/App.less');

import React from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class Tweets extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <ListGroup>
        {this.props.tweets.map(tweet =>
          <ListGroupItem key={tweet.get('id')}>{tweet.get('text')}</ListGroupItem>)}
      </ListGroup>
    );
  }
}

export default Tweets;
