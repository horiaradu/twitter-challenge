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

  moreBtnClasses() {
    return classNames(
      'pull-right',
      'mr-10',
      {disabled: !this.props.canFetch},
    );
  }

  moreIconClasses() {
    return this.props.isFetching ? 'fa fa-fw fa-lg fa-spin fa-spinner' : 'hidden';
  }

  render() {
    return (
      <div>
        {this.fetchingTweets() ?
          <div>
            <i className="fa fa-fw fa-lg fa-spin fa-spinner"/> <span>Fetching tweets...</span>
          </div> :
          <div>
            <Tweets tweets={this.props.tweets}/>
            <Button bsStyle="default" className={this.moreBtnClasses()}
                    onClick={() => this.props.canFetch && this.props.fetchTweets(this.query)}>
              <i className={this.moreIconClasses()}/> more...
            </Button>
          </div>
        }
      </div>
    );
  }
}

export default TweetsApp;
