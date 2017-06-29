import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import connect from '../connect';

export class TwitterLoginValidation extends Component{
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log(this.props);
    console.log('Allt lyckades');
    hashHistory.push('/main');
    //this.context.replace('/main');
    //this.context.next();
  }

  render() {
    return false;
  }
}

TwitterLoginValidation.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect((state) => ({}), TwitterLoginValidation);