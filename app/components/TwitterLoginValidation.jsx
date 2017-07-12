import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import connect from '../connect';

export class TwitterLoginValidation extends Component{
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('Succesfully authenticated to twitter!');
    hashHistory.push('/main');
  }

  render() {
    return false;
  }
};