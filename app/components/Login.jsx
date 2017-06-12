import React, {Component} from 'react';
import * as actions from 'actions';
import connect from '../connect';

export class Login extends Component {
  
  constructor(props) {
    super(props);
  }

  onLogin() {
    console.log(this.props);
    this.props.login(123);
  }

  render() {
    return(
      <div className="login-container">
        <h2 className="text-center" >Twitter Feed Anouncer</h2>
        <h5 className="text-center subheader" >The lazy way to read your timeline</h5>
        
        <div className="row">
          <div className="columns small-centered small-10 medium-6 large-4">
            <button className="button small expanded primary" onClick={this.onLogin.bind(this)}>Sign me in with twitter</button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state) => ({}), Login);