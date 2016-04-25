require('../styles/App.less');

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Tweets from './Tweets'

class TweetsApp extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentWillMount() {
    this.props.fetchTweets('%23visma')
  }

  render() {
    return (
      <div>
        {this.props.isFetching ?
          <div>Fetching tweets...</div> :
          <Tweets tweets={this.props.tweets}/>
        }
      </div>
    );
  }
}

export default TweetsApp;
