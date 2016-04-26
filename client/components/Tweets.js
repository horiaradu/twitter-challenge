import React from 'react';
import Tweet from './Tweet';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Clearfix, Col} from 'react-bootstrap';
import {List} from 'immutable';

class Tweets extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  tweetGroups() {
    return partition(this.props.tweets, List());

    function partition(tweets, acc) {
      if (tweets.isEmpty()) {
        return acc;
      } else {
        return partition(tweets.skip(3), acc.push(tweets.take(3)));
      }
    }
  }

  keyForGroup(group) {
    return group.reduce(
      (key, tweet) => `${key}${tweet.get('id')}`,
      ''
    );
  }

  render() {
    return (
      <div>
        {this.tweetGroups().map(group =>
          <div key={this.keyForGroup(group)}>
            {group.map(tweet =>
              <div className="col-md-4">
                <Tweet tweet={tweet} key={tweet.get('id')}/>
              </div>
            )}
            <Clearfix visibleLgBlock visibleMdBlock/>
          </div>
        )}
      </div>
    );
  }

  // render() {
  //   return (
  //     <div>
  //       {this.props.tweets.map(tweet =>
  //         <div>
  //           <Tweet tweet={tweet} key={tweet.get('id')} className="col-md-4"/>
  //           <Clearfix visibleSmBlock><code>&lt;{'Clearfix visibleSmBlock'} /&gt;</code></Clearfix>
  //         </div>
  //       )}
  //     </div>
  //   );
  // }
}

export default Tweets;
