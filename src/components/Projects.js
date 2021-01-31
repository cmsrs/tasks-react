import React, { Component } from 'react';
import requireAuth from './requireAuth';
//import Product from './products/Product';
import { connect } from 'react-redux';
import * as actions from '../actions/projects';
import Header from './Header';

class Projects extends Component {

  render() {
    return (
      <div>
      <Header />
      <div  className="mt-3  container">
        <h2 className="mb-3">Projects and tasks</h2>
        ___RS_TERSTT11243234____
      </div>
      </div>
    );
  }
}

export default connect(null, actions)(requireAuth(Projects));
