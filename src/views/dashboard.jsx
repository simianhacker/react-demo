import React from 'react';
import Bootstrap from 'react-bootstrap';
import Router from 'react-router';
import beforeTransition from 'mixins/before_transition';
import requireUser from 'lib/require_user';

var { Grid, Row, Col } = Bootstrap;

export default React.createClass({
  mixins: [
    beforeTransition(requireUser),
    Router.Navigation,
    Router.State
  ],
  render: function () {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
             <h1>Your Dashboard</h1>
          </Col>
        </Row>
      </Grid>
     );
  }
});
