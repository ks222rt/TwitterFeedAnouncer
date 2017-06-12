
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './actions/actions';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
} 

export default (stateToProps, Element) => 
  connect(
    stateToProps, 
    mapDispatchToProps
)(Element);