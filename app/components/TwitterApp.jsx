import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import TweetList from 'TweetList';
import connect from '../connect';

export class TwitterApp extends Component{
  constructor(props) {
    super(props);
  }

  onLogout(event) {
    event.preventDefault();
  
    this.props.startLogout()
      .then((response) => {
        if(response.loggedOut) {
          console.log(response.message);
          hashHistory.push('/');
        }else {
          console.log(response.message);
        }
      }).catch((error) => {
        console.log(errror);
      });
  }

  render() {
    return(
      <div>
        <div>
            <a href="#" onClick={this.onLogout.bind(this)}>Logout</a>
        </div>

        <h1>Welcome to Heaven, the lazy way to read the homeline!</h1>

        <div>
          <TweetList/>
        </div>
        
        <div>Hello darkness, my old friend!</div>
      </div>
    )
  }
};

export default connect((state) => ({}), TwitterApp);