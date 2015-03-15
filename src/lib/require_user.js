import AuthStore from 'stores/auth_store';
import AuthActions from 'actions/auth_actions';
import once from 'lib/once';
import TransitionError from 'lib/transition_error';

export default function () {
  // If things go wrong we need to transition to signin
  var redirectToSignin = new TransitionError('signin');

  // Get the current loggedin user
  var user = AuthStore.getData();

  // If the user exists and is logged in then call done
  if (user && user.loggedIn) return Promise.resolve();

  // Now we have to fetch the currently logged in user. We do this through
  // the AuthActions.load action. If that action fails then we need to reject
  // with the redirecToSignin. Otherwise we need to wait till the AuthStore
  // updates once. If the user is logged in then we resolve. Otherwise reject.
  return new Promise(function (resolve, reject) {
    // Load the user using once
    once(AuthActions, 'load').catch(function () {
      reject(redirectToSignin);
    });

    // Don't move on until the auth store recieves the update.
    var unsubscribe = AuthStore.listen(function (user) {
      unsubscribe();
      if (user.loggedIn) return resolve();
      reject(redirectToSignin);
    });
  });
}
