import 'styles/main.less';
import Router from 'react-router';
import React from 'react';
import routes from 'components/routes';

// This starts everything.
Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
