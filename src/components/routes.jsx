import React from 'react';
import Router from 'react-router';
import App from 'views/app';
import Dashboard from 'views/dashboard';
import Signup from 'views/signup';
import Profile from 'views/profile';
import Signin from 'views/signin';
import Tos from 'views/tos';
import Fatal from 'views/fatal';

var { Route, DefaultRoute, Redirect, NotFoundRoute } = Router;

export default (
  <Route name="app" handler={App} path="/">
    <Route name="profile" handler={Profile} />
    <Route name="signup" handler={Signup} />
    <Route name="signin" handler={Signin} />
    <Route name="tos" handler={Tos} />
    <Route name="fatal" handler={Fatal}/>
    <Route name="dashboard" handler={Dashboard}/>
    <Redirect from="/" to="dashboard"/>
    <DefaultRoute handler={Dashboard} />
  </Route>
);
