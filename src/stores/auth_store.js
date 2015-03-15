import Reflux from 'reflux';
import rest from 'lib/rest';
import AuthActions from 'actions/auth_actions';
import _ from 'lodash';

var defaultUser = {
  _id: null,
  full_name: null,
  name: null,
  sex: null,
  loggedIn: false
};

export default Reflux.createStore({
  listenables: [AuthActions],

  init: function () {
    this.user = _.clone(defaultUser);
    AuthActions.load();
  },

  getInitialState: function () {
    return this.user;
  },

  onLoadCompleted: function (resp) {
    this.user = resp.entity;
    AuthActions.updateProfile(this.user);
  },

  onLoadFailed: function (err) {
    AuthActions.updateProfile(defaultUser);
  },

  onLogoutCompleted: function () {
    this.user = _.clone(defaultUser);
    AuthActions.updateProfile(this.user);
  },

  onLoginCompleted: function (resp) {
    this.user = resp.entity;
    AuthActions.updateProfile(this.user);
  },

  onLoginFailed: function (err) {
    AuthActions.submitError(err);
  },

  onRegisterCompleted: function (resp) {
    this.user = resp.entity;
    AuthActions.updateProfile(this.user);
  },

  onRegisterFailed: function (err) {
    AuthActions.submitError(err);
  },

  onUpdateProfile: function (user) {
    if (user) {
      this.user = user;
      this.user.loggedIn = !!user._id;
    }
    this.trigger(this.user);
  },

  getData: function () {
    return this.user;
  }
});
