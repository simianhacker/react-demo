import React from 'react';
import Bootstrap from 'react-bootstrap';
var { Alert, Grid, Row, Col, Input, Button } = Bootstrap;

export default React.createClass({
  render: function () {
    return (
      <Grid style={{ paddingTop: 30 }}>
        <Row>
          <Col sm={ 12 }>
            <Alert bsStyle="danger">
              <h1>Oh Man!</h1>
              <p>Something really bad went wrong!</p>
            </Alert>
          </Col>
        </Row>
      </Grid>
    )  
  }
})