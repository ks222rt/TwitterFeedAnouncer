import React, {Component} from 'react';
import connect from '../connect';

export class Tweet extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var {id, text, user} = this.props;

    return (
        <div className="tweet-card" id={id}>
          <div className="tweet-card-header">
            <img className="tweet-card-image" src={user.profile_image_url}></img>
            <span className="span-block tweet-name">{user.name}</span>
            <span className="span-block tweet-user">{user.screen_name}</span>
          </div>
          <p>{text}</p>
        </div>
    );
  }
};

export default connect((state) => ({}), Tweet);