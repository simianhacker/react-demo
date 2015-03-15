import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';
import Bootstrap from 'react-bootstrap';
import AuthStore from 'stores/auth_store';
import beforeTransition from 'mixins/before_transition';
import requireUser from 'lib/require_user';

var { Grid, Row, Col, Table } = Bootstrap;

export default React.createClass({

  mixins: [
    beforeTransition(requireUser),
    Reflux.connect(AuthStore, 'user'),
    Router.Navigation,
    Router.State
  ],

  render: function () {
    var user = this.state.user || {};
    return (
      <Grid>
        <Row>
          <Col xs={12}>
             <h1>Your Profile</h1>
             <Table>
               <tbody>
                 <tr>
                   <td><strong>Name</strong></td>
                   <td>{ user.full_name }</td>
                 </tr>
                 <tr>
                   <td><strong>Username</strong></td>
                   <td>{ user.name }</td>
                 </tr>
                 <tr>
                   <td><strong>Sex</strong></td>
                   <td>{ user.sex === 'm' ? 'Male' : 'Female' }</td>
                 </tr>
               </tbody>
             </Table>
          </Col>
        </Row>
      </Grid>
    );
  }
});
