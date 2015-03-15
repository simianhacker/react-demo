import AuthStore from 'stores/auth_store';
import AuthActions from 'actions/auth_actions';
import once from 'lib/once';
import TransitionError from 'lib/transition_error';

export default function () {
  // Get the current loggedin user
  var user = AuthStore.getData();

  // If the user exists and is logged in then  we need to transition to the dashboard
  if (user && user.loggedIn) return Promise.reject(new TransitionError('/'));

  // Load the user using once (which calls load user and listens once to the results)
  return once(AuthActions, 'load').then(function () {
    // Transition to the dashboard if the user is logged in
    throw new TransitionError('/');
  }).catch(function () {
    // Do nothing is there is no user.
    return;
  });
}
