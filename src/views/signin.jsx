import React from 'react';
import Router from 'react-router';
import Reflux from 'reflux';
import AuthActions from 'actions/auth_actions';
import AuthStore from 'stores/auth_store';
import AuthSubmitStore from 'stores/auth_submit_store';
import Bootstrap from 'react-bootstrap';
import beforeTransition from 'mixins/before_transition';
import requireNoUser from 'lib/require_no_user';

var { Navbar, Nav, NavItem, Alert, Grid, Row, Col, Input, Button } = Bootstrap;
var { Link } = Router;
export default React.createClass({

  mixins: [
    beforeTransition(requireNoUser),
    Reflux.listenTo(AuthStore, 'onStoreUpdate'),
    Reflux.listenTo(AuthSubmitStore, 'onErrorMessage'),
    Router.Navigation,
    Router.State
  ],

  getInitialState: function () {
    return {
      error: '',
      submitted: false
    };
  },

  onStoreUpdate: function (user) {
    if (user.loggedIn) {
      this.transitionTo('app');
    }
  },

  onErrorMessage: function (message) {
    this.refs.submit.getDOMNode().disabled = false;
    this.setState({
      error: message,
      submitted: false,
    });
  },

  login: function (e) {
    e.preventDefault();
    this.setState({ submitted: true });
    this.refs.submit.getDOMNode().disabled = true;

    var auth = {
      name: this.refs.name.getValue().trim(),
      password: this.refs.password.getValue().trim()
    };

    AuthActions.login(auth);
  },

  render: function () {
    var error;
    if (this.state.error) {
      error = (
        <Row>
          <Col xs={4} xsOffset={4}>
            <Alert bsStyle="danger">
              <strong>Oops!</strong> {this.state.error}
            </Alert>
          </Col>
        </Row>
      );
    }

    return (
        <Grid fluid>
          <form onSubmit={ this.login }>
          <Row>
            <Col sm={12} style={{ textAlign: "center", marginBottom: 20, paddingTop: 30 }}>
              <h1 className="text-primary">Demonstration Site</h1>
              <h3>Registered User Login</h3>
            </Col>
          </Row>
          { error }
          <Row>
            <Col sm={4} smOffset={ 4 }><Input
              type="text"
              placeholder="Username"
              ref="name"
              hasFeedback
              required /></Col>
          </Row>
          <Row>
            <Col sm={4} smOffset={ 4 }><Input
              type="password"
              placeholder="Password"
              ref="password"
              hasFeedback
              required /></Col>
          </Row>
          <Row>
            <Col sm={4} smOffset={ 4 } className="text-center">
              <p><Button type="submit" bsStyle="primary" bsSize="large" ref="submit">Sign In<i style={{ paddingLeft: 10 }} className="fa fa-sign-in"></i></Button></p>
              <p>Forgot Password?</p>
              <p className="lead">Don't have an account? <strong><Link to="signup">Sign Up Now</Link></strong></p>
            </Col>
          </Row>
          </form>
        </Grid>
    );
  }

});
