import React, {Component} from 'react';
import TweetList from 'TweetList';

export class TwitterApp extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <h1>Welcome to Heaven, the lazy way to read the homeline!</h1>
        <div>
            <a>Logout</a>
        </div>

        <div>
          <TweetList />
        </div>
        
        <div>Hello darkness, my old friend!</div>
      </div>
    )
  }
}