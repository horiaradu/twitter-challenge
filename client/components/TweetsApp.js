require('../styles/App.less');

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Tweets from './Tweets'
import {Button} from 'react-bootstrap';
import classNames from 'classnames';

class TweetsApp extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.query = '%23visma';
  }

  componentWillMount() {
    this.props.fetchTweets(this.query)
  }

  fetchingTweets() {
    return this.props.tweets.isEmpty() && this.props.isFetching;
  }

  render() {
    return (
      <div>
        {this.fetchingTweets() ?
          <div>Fetching tweets...</div> :
          <div>
            <Tweets tweets={this.props.tweets}/>
            <Button bsStyle="default" className={classNames('pull-right', {disabled: !this.props.canFetch})}
                    onClick={() => this.props.fetchTweets(this.query)}>
              more...
            </Button>
          </div>
        }
      </div>
    );
  }
}

export default TweetsApp;
