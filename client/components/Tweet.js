import React from 'react';
import {Panel, Col, Image} from 'react-bootstrap';

const Tweet = ({tweet}) => {
  return (
    <Panel>
      <div className="tweet-content">
        <Image src={tweet.getIn(['user', 'profile_image_url'])} circle className="tweet-user-img"/>

        <div>
          <strong>{tweet.getIn(['user', 'name'])}</strong>
        </div>
        <div className="twitter-handle">
          <span>@{tweet.getIn(['user', 'screen_name'])}</span>
        </div>

        <div>
          {tweet.get('text')}
        </div>

        <div className="tweet-time">
          {tweet.get('created_at')}
        </div>
      </div>
    </Panel>
  );
};

export default Tweet;
