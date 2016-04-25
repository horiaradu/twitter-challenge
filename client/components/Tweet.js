require('../styles/App.less');

import React from 'react';
import {Panel, Col, Image} from 'react-bootstrap';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class Tweet extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <Panel>
        <div className="tweet-content">
          <Image src={this.props.tweet.getIn(['user', 'profile_image_url'])} circle className="tweet-user-img"/>

          <div>
            <strong>{this.props.tweet.getIn(['user', 'name'])}</strong>
          </div>
          <div className="twitter-handle">
            <span>@{this.props.tweet.getIn(['user', 'screen_name'])}</span>
          </div>

          <div>
            {this.props.tweet.get('text')}
          </div>

          <div className="tweet-time">
            {this.props.tweet.get('created_at')}
          </div>
        </div>
      </Panel>
    );
  }
}

export default Tweet;
