import React, {Component} from 'react';
import TweetList from 'TweetList';
import UserProfile from 'UserProfile';
import connect from '../connect';

export class TwitterApp extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <h1 className="application-header">Welcome to Heaven, the lazy way to read the homeline!</h1>

        <div>
          <TweetList/>
          <UserProfile/>
        </div>
        
      </div>
    )
  }
};

export default connect((state) => ({}), TwitterApp);