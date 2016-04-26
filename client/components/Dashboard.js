import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {hashHistory} from 'react-router';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <div className="text-center mt-150">
        <img src="assets/images/twitter-logo.png" width="150" className="click-able"
             onClick={() => hashHistory.push('/tweets')}>
        </img>
      </div>
    );
  }
}

export default Dashboard;
