import _ from 'lodash';
import React from 'react';
import Router from 'react-router';
import Reflux from 'reflux';
import AuthActions from 'actions/auth_actions';
import AuthStore from 'stores/auth_store';
import AuthSubmitStore from 'stores/auth_submit_store';
import Bootstrap from 'react-bootstrap';
import beforeTransition from 'mixins/before_transition';
import requireNoUser from 'lib/require_no_user';

var { Alert, Grid, Row, Col, Input, Button } = Bootstrap;
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
    return { error: '', submitted: false };
  },

  onStoreUpdate: function (user) {
    if (user.loggedIn) {
      this.transitionTo('app');
    }
  },

  onErrorMessage: function (message) {
    this.refs.submit.getDOMNode().disabled = false;
    this.setState({
      error: message || message.message,
      submitted: false,
    });
  },

  getForm: function () {
    var self = this;
    var keys = _.keys(this.refs);
    var form = {};
    _.each(keys, function (key) {
      if (typeof(self.refs[key].getValue) === 'function') {
        form[key] = self.refs[key].getValue();
      }
    });
    return form;
  },

  register: function (e) {
    e.preventDefault();
    var form = this.getForm();
    this.refs.submit.getDOMNode().disabled = true;
    AuthActions.register(form);
  },

  render: function () {
    var error;
    if (this.state.error) {
      error = (
        <Row>
          <Col sm={12}>
            <Alert bsStyle="danger">
              <strong>Oops!</strong> {this.state.error}
            </Alert>
          </Col>
        </Row>
      );
    }

    return (
      <Grid style={{ paddingTop: 30 }}>
        <form onSubmit={ this.register }>
        <Row>
          <Col sm={ 12 } className="text-center">
            <h1 className="text-primary">Demonstration Site</h1>
          </Col>
        </Row>
        { error }
        <Row>
          <Col sm={ 6 }><Input type="text"
            label="Name"
            ref="full_name"
            required
            />
          </Col>
          <Col sm={ 6 }><Input type="text"
            label="Username"
            ref="name"
            required
            hasFeedback />
          </Col>
        </Row>
        <Row>
          <Col sm={ 6 }><Input type="select"
            label="Sex"
            ref="sex"
            required
            hasFeedback >
              <option value="">Select</option>
              <option value="m">Male</option>
              <option value="f">Female</option>
            </Input>
          </Col>
          <Col sm={ 6 }><Input type="password"
            label="Password"
            ref="password"
            required
            pattern=".{8,}"
            title="Minimum length is 8 characters"
            hasFeedback />
          </Col>
        </Row>
        <Row>
          <Col sm={ 12 }>
            <p className="text-center">By clicking "Register Accont" you agree to our <Link to="tos">terms of service.</Link></p>
          </Col>
        </Row>
        <Row className="submit">
          <Col sm={ 12 } className="text-center"><Button ref="submit" type="submit" bsSize="large" bsStyle="primary">Register Account<i style={{ paddingLeft: 10 }} className="fa fa-pencil-square-o"></i></Button></Col>
        </Row>
        </form>
        <Row>
          <Col>
            <p className="text-center lead" style={{ paddingTop: 20 }}>Already have an account? <strong><Link to="signin">Sign In Here</Link></strong></p>
          </Col>
        </Row>
      </Grid>
    )
  }
});
