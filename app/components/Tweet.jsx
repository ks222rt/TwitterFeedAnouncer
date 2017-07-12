import React, {Component} from 'react';
import connect from '../connect';

export class Tweet extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var {id, text} = this.props;

    return (
        <div>
          <p>{id}</p>
          <p>{text}</p>
        </div>
    );
  }
};

export default connect((state) => ({}), Tweet);