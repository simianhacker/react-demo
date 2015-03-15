import TransitionError from 'lib/transition_error';


export default function (...tasks) {
  return {
    statics: {
      willTransitionTo: function (transition, params, query, done) {

        function handleSuccess () { done(); }
        function noop () { return Promise.resolve(); }

        function handleError (err) {
          if (err instanceof TransitionError) {
            transition.redirect(err.route);
          } else {
            console.log('Fatal Error', err);
            transition.redirect('fatal');
          }
          done();
        }

        var prom = tasks.reduce(function (memo, fn) {
          return function () {
            return memo().then(fn);
          };
        }, noop);

        prom().then(handleSuccess).catch(handleError);

      }
    }
  };
}
