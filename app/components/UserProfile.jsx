import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import connect from '../connect';

export class UserProfile extends Component {
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
      <div className="userprofile-container">
        <div>
            <a href="#" onClick={this.onLogout.bind(this)}>Logout</a>
        </div>
        <p>Mitt namn är Stoffe</p>
      </div>
    )
  }
};

export default connect((state) => ({}), UserProfile);