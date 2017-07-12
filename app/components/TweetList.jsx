import React, {Component} from 'react';
import connect from '../connect';
import Tweet from 'Tweet';

export class TweetList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var {tweets} = this.props;

    var renderTweets = () => {
      if(tweets.length === 0) {
        return(
          <p>No tweets available!</p>
        );
      }

      return tweets.map((tweet) => {
        return (
          <Tweet key={tweet.id} {...tweet}/>
        );
      });
    }

    return(
    <div>
      {renderTweets()}
    </div>
    )
  }
};

export default connect((state) => ({
  tweets: state.tweets
}), TweetList);