import React, {Component} from 'react';
import connect from '../connect';

export class Tweet extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var {id, text, user} = this.props;

    return (
        <div className="tweet-card">
          <h1>{user.name}</h1>
          <p>{id}</p>
          <p>{text}</p>
        </div>
    );
  }
};

export default connect((state) => ({}), Tweet);