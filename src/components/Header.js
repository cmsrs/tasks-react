import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ADMIN_URL_SECRET } from '../config';

class Header extends Component {

  renderLinks() {
    const urlSignout = "/admin"+ADMIN_URL_SECRET+"/signout";

    if (this.props.authenticated) {
      return (
        <div className="container-fluid">
          <div className="container">
            Projects
          </div>
          <Link   to={urlSignout}>Sign Out</Link>
        </div>
      );
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {this.renderLinks()}
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);
