require('../styles/App.less');

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Link} from 'react-router';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <div>
        <Link to={'/tweets'}
              className="btn btn-default"
              onClick={() => this.props.fetchTweets('nba')}>
          Tweets
        </Link>
      </div>
    );
  }
}

export default Dashboard;
