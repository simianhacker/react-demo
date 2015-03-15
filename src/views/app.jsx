import React from 'react';
import Router from 'react-router';
import Reflux from 'reflux';
import AuthActions from 'actions/auth_actions';
import AuthStore from 'stores/auth_store';
import Bootstrap from 'react-bootstrap';
import ReactRouterBootstrap from 'react-router-bootstrap';

var { Navbar, Nav, NavItem, Alert, Grid, Row, Col, Input, Button, DropdownButton, MenuItem } = Bootstrap;
var { NavItemLink, ButtonLink, MenuItemLink } = ReactRouterBootstrap;
var { Link, RouteHandler } = Router;

export default React.createClass({

  mixins: [
    Reflux.connect(AuthStore, 'user'),
    Router.Navigation,
    Router.State
  ],

  componentWillMount: function () {
    var self = this;
    this.unsubscribeFromLogout = AuthActions.logout.completed.listen(function () {
      self.transitionTo('signin');
    });
  },

  componentWillUnmount: function () {
    this.unsubscribeFromLogout();
  },

  logout: function () {
    AuthActions.logout();
  },

  render: function () {
    var user = this.state.user;

    if(!user || (user && !user.loggedIn)) {
      return (
        <div>
          <RouteHandler user={ user }></RouteHandler>
        </div>
      );
    }

    return (
      <div>
        <Navbar inverse={false} toggleNavKey={1} staticTop={true} fluid={true} brand="Demonstration Site">
          <Nav key={1}>
            <NavItemLink to="dashboard">Dashboard</NavItemLink>
            <NavItemLink to="profile">Profile</NavItemLink>
          </Nav>
          <Nav className="pull-right">
            <p className="navbar-text">Logged in as <strong>{ user.full_name}</strong></p>
            <NavItem onClick={ this.logout }><i className="fa fa-sign-out"></i> Logout</NavItem>
          </Nav>
        </Navbar>
        <RouteHandler/>
      </div>
    );
  }
});

