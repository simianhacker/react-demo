import Reflux from 'reflux';
import rest from 'lib/rest';
import _ from 'lodash';

var AuthActions = Reflux.createActions({
  load: { asyncResult: true },
  login: { asyncResult: true },
  logout: { asyncResult: true },
  submitError: { asyncResult: true },
  updateProfile: { asyncResult: true },
  validate: { asyncResult: true },
  register: { asyncResult: true }
});

function userDetails (name) {
  var id = 'org.couchdb.user:' + name;
  return rest({
    method: 'GET',
    path: '/couch/_users/' + id,
    headers: { 'Accept': 'application/json' }
  });
}

function login (auth) {
  var options = {
    method: 'POST',
    path: '/couch/_session',
    entity: auth,
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
  };
  return rest(options);
}

AuthActions.load.listenAndPromise(function () {
  var options = {
    method: 'GET',
    path: '/couch/_session',
    headers: { 'Accept': 'application/json' }
  }
  return rest(options).then(function (resp) {
    return userDetails(resp.entity.userCtx.name);
  });
});

AuthActions.logout.listenAndPromise(function () {
  var options = {
    method: 'DELETE',
    path: '/couch/_session',
    headers: { 'Accept': 'application/json' }
  };
  return rest(options);
});


AuthActions.login.listenAndPromise(function (auth) {
  return login(auth).then(function (resp) {
    return userDetails(auth.name);
  });
});

AuthActions.register.listenAndPromise(function (form) {
  var id = 'org.couchdb.user:' + form.name
  var options = {
    method: 'PUT',
    path: '/couch/_users/' + id,
    entity: _.defaults({ _id: id, type: 'user', roles:[] }, form),
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return rest(options).then(function (resp) {
    return login({ name: form.name, password: form.password })
      .then(function (resp) {
        return userDetails(form.name);
      });
  });
});

export default AuthActions;

